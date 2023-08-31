import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./config/db";
import "colors";
import dotenv from "dotenv";

import author from "./components/author";
import book from "./components/book";

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

const server = new ApolloServer({
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
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
