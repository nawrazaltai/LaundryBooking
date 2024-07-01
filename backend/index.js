import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authenticateJWT from "./middleware/authMiddleware.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
// const MONGO_DB_URI = process.env.MONGO_DB_URI;

connectDB();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Running");
});
