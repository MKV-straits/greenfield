const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(express.json());
app.use("/", router);

app.listen(3001, () => {
  console.log("listening on port 3001");
});

const password = process.env.REACT_APP_DB_PASSWORD;
console.log(password, process.env);

mongoose
  .connect(
    `mongodb+srv://fralinev:${password}@cluster1.2iciml8.mongodb.net/greenfield`
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(["failed to connect to db", err]));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

function addUser(user) {
  new User({ username: user.username, password: user.password }).save();
}

app.get("/test", (req, res) => {
  console.log("backend seems to be working");
  res.send("backend OK");
});

app.post("/user", (req, res) => {
  addUser(req.body);
  res.send(`new user ${req.body.username} created`);
});
