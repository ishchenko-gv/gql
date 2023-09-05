import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export async function connectDB() {
  console.log("Connecting MongoDB...".cyan);
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected".cyan.bold);
}

export function getSessionStore() {
  return MongoStore.create({
    client: mongoose.connection.getClient(),
  });
}
