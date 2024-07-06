import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(401).json({ error: "Användaren finns inte" });
    }

    const isMatched = password === user.password;

    if (!isMatched) {
      return res.status(401).json({ error: "Felaktiga inloggningsuppgifter" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY
    );

    const { password: userPassword, ...userToReturn } = user.toObject();

    res.json({ token, user: userToReturn });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ error: "Ett oväntat fel inträffade" });
  }
};
