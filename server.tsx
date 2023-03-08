const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(express.json());
app.use("/", router);
app.use(express.static("build"));

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
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

function addUser(user) {
  console.log("first instance: ", user);
  return User.findOne({ username: user.user }).then((found) => {
    console.log("user: ", found);
    if (!found) {
      console.log("not found, returning new user");
      return new User({ username: user.user, password: user.password }).save();
    } else {
      console.log("taken!!!");
      return "taken";
    }
  });
}

app.get("/test", (req, res) => {
  console.log("backend seems to be working");
  res.send("backend OK");
});

app.post("/user", (req, res) => {
  console.log("app.post: ", req.body);
  return addUser(req.body).then((result) => {
    return res.send(result);
  });

  //   .then((check) => {
  //     if (check) {
  //       return res.send(`new user ${req.body.user} created`);
  //     } else {
  //       return res.send(`user ${req.body.user} already exists`);
  //     }
  //   });
});
app.post("/authenticate", (req, res) => {
  console.log("log-in request object received: ", req.body);
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
