import { ObjectId } from "mongoose";
import Book from "./model";

export async function book(_: {}, args: { id: ObjectId }) {
  return Book.findById(args.id).populate("authors");
}

export async function books() {
  return Book.find().populate("authors");
}

export async function booksByAuthor(_: {}, args: { authorId: ObjectId }) {
  return Book.find({ authors: args.authorId });
}

export async function addBook(
  _: {},
  args: { title: string; authors: [ObjectId] }
) {
  const book = new Book({
    title: args.title,
    authors: args.authors,
  });

  return book.save();
}
