import { ObjectId } from "mongoose";
import Book from "./model";

export async function books() {
  return Book.find().populate("authors");
}

export async function book(_: {}, args: { id: ObjectId }) {
  return Book.findOne({ _id: args.id }).populate("authors");
}
