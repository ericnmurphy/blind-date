const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const key = require("./key");

const User = require("./models/User.js");

const app = express();
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose
  .connect(
    key,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  console.log(user);
  user.save(function(err, newUser) {
    res.send("saved to database");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
