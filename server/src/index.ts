import http from "http";
import express from "express";
import session, { Store } from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDB, getSessionStore } from "./config/db";
import "colors";
import dotenv from "dotenv";

import { authRouter, setupAuthStrategies } from "./components/user";
import author from "./components/author";
import book from "./components/book";
import passport from "passport";

dotenv.config();
await connectDB();

const queryTypeDefs = `#graphql
  type Query {
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
  typeDefs: [queryTypeDefs, author.typeDefs, book.typeDefs],
  resolvers: {
    Query: {
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: getSessionStore() as unknown as Store,
  })
);

setupAuthStrategies();

app.use(passport.authenticate("session"));

app.use("/auth", authRouter);
app.use("/graphql", expressMiddleware(apolloServer));

await new Promise((resolve) =>
  httpServer.listen({ port: process.env.PORT }, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    resolve(null);
  })
);
