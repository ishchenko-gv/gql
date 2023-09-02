import { ObjectId } from "mongoose";
import { UserDocument } from "../components/user/model";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
    }
  }

  namespace Express {
    interface User extends UserDocument {
      _id: ObjectId;
      email: string;
    }
  }
}
