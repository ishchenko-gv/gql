import { ObjectId } from "mongoose";
import "express-session";
import { UserDocument } from "../components/user/model";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }

  namespace Express {
    interface User extends UserDocument {
      _id: ObjectId;
      email: string;
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    passport: {
      user: string;
    };
  }
}
