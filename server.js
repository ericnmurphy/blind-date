const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const key = require("./key");

const User = require("./models/User.js");
const Match = require("./models/Match.js");

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

// Create match function

const createMatch = (user1, user2) => {
  const message1 = `Hi ${user1.firstName},
  Here's the Blind Date for your friend.

  ${user1.firstName}, ${user1.profession}, ${user1.company} (${
    user1.website
  }) knows their friend through ${user1.association}. ${
    user1.gender === "man" ? "He's" : "She's"
  } ${user1.height === "medium" ? "of medium build" : user1.height}, ${
    user1.adjective1
  }, ${user1.adjective2}, ${user1.adjective3}, ${user1.adjective4}, ${
    user1.adjective5
  } and ${user1.adjective6}. ${
    user1.gender === "man"
      ? `He is ${user1.beard}.`
      : `Her best quality is ${user1.bestQuality}.`
  } You're most likely to find ${user1.gender === "man" ? "him" : "her"} ${
    user1.haunt
  }.`;

  const message2 = `Hi ${user2.firstName},
  Here's the Blind Date for your friend.

  ${user2.firstName}, ${user2.profession}, ${user2.company} (${
    user2.website
  }) knows their friend through ${user2.association}. ${
    user2.gender === "man" ? "He's" : "She's"
  } ${user2.height === "medium" ? "of medium build" : user2.height}, ${
    user2.adjective1
  }, ${user2.adjective2}, ${user2.adjective3}, ${user2.adjective4}, ${
    user2.adjective5
  } and ${user2.adjective6}. ${
    user2.gender === "man"
      ? `He is ${user2.beard}.`
      : `Her best quality is ${user2.bestQuality}.`
  } You're most likely to find ${user2.gender === "man" ? "him" : "her"} ${
    user2.haunt
  }.`;

  const match = new Match({
    user1: user1.id,
    user2: user2.id,
    message1: message1,
    message2: message2
  });
  match.save(function(err) {
    console.log(err);
  });
};

// Match processing

const findMatch = user => {
  const matchGender = user.gender === "man" ? "woman" : "man";
  const params = {};
  params["gender"] = matchGender;
  params["socioeconomic"] = user.socioeconomic;
  params["age"] = { $gte: user.age - 5, $lte: user.age + 5 };
  User.find(
    params,
    "id firstName profession company website gender association height adjective1 adjective2 adjective3 adjective4 adjective5 adjective6 bear bestQuality haunt",
    function(err, users) {
      if (err) {
        return handleError(err);
      } else {
        console.log(users);
        users.forEach(singleUser => {
          const user2 = singleUser;
          console.log(user2);
          createMatch(user, user2);
        });
      }
    }
  );
};

// Referral form signup

app.post("/api/form", (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  console.log(user);
  user.save(function(err, newUser) {
    res.send("saved to database");
    findMatch(newUser);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
