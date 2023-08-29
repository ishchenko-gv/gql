import { connect } from "mongoose";

export async function connectDB() {
  console.log("Connecting MongoDB...".cyan);
  await connect(process.env.MONGO_URI);
  console.log("MongoDB connected".cyan.bold);
}
