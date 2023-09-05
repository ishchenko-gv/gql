import { Document, Schema, model } from "mongoose";

interface Profile {
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
}

export interface UserDocument extends Document {
  email: string;
  avatarUrl?: string;
  hashedPassword?: string;
  googleId?: string;
  profile: Profile;
}

const profileSchema = new Schema<Profile>(
  {
    firstName: {
      type: String,
      default: "",
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

profileSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    profile: {
      type: profileSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
