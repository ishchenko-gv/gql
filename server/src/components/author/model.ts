import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    name: String,
    photoImgUrl: String,
    biography: String,
    biographyShort: String,
    bornDate: Date,
    diedDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export default model("Author", authorSchema);
