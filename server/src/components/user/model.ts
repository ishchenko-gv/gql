import { Document, Schema, model } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  hashedPassword: string;
  googleId: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
    },
    hashedPassword: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
