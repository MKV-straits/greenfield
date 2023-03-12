const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();
const app = express();

app.use(express.json());
app.use("/", router);
app.use(express.static("build"));
app.use(cookieParser());

const password = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://fralinev:${password}@cluster1.2iciml8.mongodb.net/greenfield`
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(["failed to connect to db", err]));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  stats: { money: Number, day: Number, plots: [Number] },
  token: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    console.log("decoded: ", decoded);
    req.user = decoded;
    next();
  });
};

function addUser(newUser) {
  const { username, password } = newUser;
  return User.findOne({ username }).then((found) => {
    console.log("user: ", found);
    if (!found) {
      console.log("creating new user");
      return new User({
        username,
        password,
        stats: { money: 1000, day: 0, plots: [] },
      }).save();
    } else {
      console.log("taken!!!");
      return "taken";
    }
  });
}

app.get("/test", verifyJWT, (req, res) => {
  console.log("get / test");
  res.send("worked");
});

app.get("/", verifyJWT, (req, res) => {
  console.log("home got");
  res.send("home got");
});

app.post("/user/stats", async (req, res) => {
  console.log("saving...");
  console.log(req.body.stats);
  await User.updateOne(
    { username: req.body.username },
    {
      $set: {
        stats: {
          money: req.body.stats.money,
          day: req.body.stats.day,
          plots: req.body.stats.plots,
        },
      },
    }
  );
  res.send("signed out");
});

app.post("/auth/signup", (req, res) => {
  return addUser(req.body).then((result) => {
    return res.send(result);
  });
});
app.post("/auth/access", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }
  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(401).json({ message: "user not found" });
  }
  const match = req.body.password === foundUser.password;
  if (match) {
    const user = { username: req.body.username };
    const accessToken = generateAccessToken(user);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await User.updateOne(
      { username: req.body.username },
      { $set: { token: accessToken } }
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const dbUser = await User.findOne({ username: req.body.username });
    console.log("from /access, user: ", user);
    res.json({ dbUser });
  }
});

app.post("/auth/signin", verifyJWT, (req, res) => {
  console.log("SIGNED IN!");
  res.redirect("/");
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
