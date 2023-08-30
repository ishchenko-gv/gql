import { ObjectId } from "mongoose";
import Author from "./model";

export async function author(_: {}, args: { id: ObjectId }) {
  return Author.findById(args.id);
}

export async function authors() {
  return Author.find();
}

export async function addAuthor(
  _: {},
  args: { name: string; bornDate: Date; diedDate: Date }
) {
  const author = new Author({
    name: args.name,
    bornDate: args.bornDate,
    diedDate: args.diedDate,
  });

  return author.save();
}
