import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./config/db";
import "colors";
import dotenv from "dotenv";

dotenv.config();
await connectDB();

import author from "./components/author";
import book from "./components/book";

const queryTypeDefs = `#graphql
  type Query {
    authors: [Author!]!
    author(id: ID!): Author
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String, authors: [ID]): Book
  }
`;

const server = new ApolloServer({
  typeDefs: [queryTypeDefs, author.typeDefs, book.typeDefs],
  resolvers: {
    Query: {
      authors: author.resolvers.authors,
      books: book.resolvers.books,
      book: book.resolvers.book,
    },
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
