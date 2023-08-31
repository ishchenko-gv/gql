import { ObjectId } from "mongoose";
import Book from "./model";

export async function book(_: {}, args: { id: ObjectId }) {
  return Book.findById(args.id).populate("authors");
}

export async function books(_: {}, args: { page: number; pageSize: number }) {
  const items = await Book.find()
    .limit(args.pageSize * 1)
    .skip((args.page - 1) * args.pageSize)
    .populate("authors");

  const totalCount = await Book.countDocuments();

  return { items, totalCount };
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
