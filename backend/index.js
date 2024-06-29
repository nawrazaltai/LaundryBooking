const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const SECRET_KEY = "LaundryTest";

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   setTimeout(next, 3000); // 3 seconds delay
// });

app.post("/login", (req, res) => {
  const user = { id: "1", username: "test", password: "123" };
  const { username, password } = req.body;
  console.log(username, password);

  if (
    username.toLowerCase() === user.username.toLowerCase() &&
    password === user.password
  ) {
    const token = jwt.sign({ id: user.id, username }, SECRET_KEY);
    return res.json({ token, user });
  }

  res.status(401).json({ error: "Felaktiga inloggningsuppgifter" });
});

app.listen(PORT, () => {
  console.log("Running");
});
