import { ObjectId } from "mongoose";
import { UserDocument } from "../components/user/model";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_REGION: string;
      AWS_S3_BUCKET: string;
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
