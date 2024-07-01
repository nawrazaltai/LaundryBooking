import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const MONGO_DB_URI = process.env.MONGO_DB_URI;

  try {
    mongoose.connect(MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB");
    process.exit(1);
  }
};

// mongoose
//   .connect(MONGO_DB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));
