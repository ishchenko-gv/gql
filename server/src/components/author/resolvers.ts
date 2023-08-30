import Author from "./model";

export async function authors() {
  return Author.find();
}
