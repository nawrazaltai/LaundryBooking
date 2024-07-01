import authenticateJWT from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

export const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    //   console.log(user);

    if (!user) {
      return res.status(404).send({ error: "Användaren finns inte" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};
