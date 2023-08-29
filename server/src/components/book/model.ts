import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: String,
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }],
});

export default model("Book", bookSchema);
