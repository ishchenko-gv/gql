import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: String,
  description: String,
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  released: Date,
  coverImgUrl: String,
});

export default model("Book", bookSchema);
