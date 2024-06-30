import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authenticateJWT from "./middleware/authenticateJWT.js";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Felaktiga inloggningsuppgifter" });
    }

    const isMatched = password === user.password;

    if (!isMatched) {
      return res.status(401).json({ error: "Felaktiga inloggningsuppgifter" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ error: "Ett oväntat fel inträffade" });
  }
});

app.get("/users/:userId", authenticateJWT, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).send({ error: "Användaren finns inte" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("Running");
});
