import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please add MONGODB_URI to .env.local"
  );
}

export async function connectDB() {
  try {
    if (
      mongoose.connection.readyState >= 1
    ) {
      return;
    }

    await mongoose.connect(
      MONGODB_URI
    );

    console.log(
      "MongoDB Connected"
    );
  } catch (error) {
    console.error(error);
  }
}