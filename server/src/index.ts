import dotenv from "dotenv";
dotenv.config();

import http from "http";
import express from "express";
import session, { Store } from "express-session";
import flash from "connect-flash";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import morgan from "morgan";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDB, getSessionStore } from "./infra/db";
import "colors";

import user, {
  authRouter,
  avatarRouter,
  localAuthStrategy,
  googleAuthStrategy,
} from "./components/user";
import author from "./components/author";
import book from "./components/book";
import { gqlCtx } from "./types";

async function start() {
  await connectDB();

  const rootTypeDefs = `#graphql
  type Query {
    userProfile: UserProfile
    author(id: ID!): Author
    authors: [Author!]!
    book(id: ID!): Book
    books(page: Int, pageSize: Int): BooksResponse 
    booksByAuthor(authorId: ID!): [Book]
  }

  type Mutation {
    addAuthor(name: String!, bornDate: String, diedDate: String): Author!
    addBook(title: String!, authors: [ID!]!): Book
  }
`;

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs: [rootTypeDefs, user.typeDefs, author.typeDefs, book.typeDefs],
    resolvers: {
      Query: {
        userProfile: user.resolvers.userProfile,
        author: author.resolvers.author,
        authors: author.resolvers.authors,
        book: book.resolvers.book,
        books: book.resolvers.books,
        booksByAuthor: book.resolvers.booksByAuthor,
      },
      Mutation: {
        addAuthor: author.resolvers.addAuthor,
        addBook: book.resolvers.addBook,
      },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();

  app.use(morgan("tiny"));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
  app.use(flash());

  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: getSessionStore() as unknown as Store,
    })
  );

  passport.use(localAuthStrategy);
  passport.use(googleAuthStrategy);
  app.use(passport.authenticate("session"));

  app.use("/auth", authRouter);
  app.use("/user", avatarRouter);

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return {
          userId: (req.session as any).passport?.user,
        } as gqlCtx;
      },
    })
  );

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
      resolve(null);
    })
  );
}

start();
