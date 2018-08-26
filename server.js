const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
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
    user1: {
      id: user1.id,
      email: user1.email,
      name: user1.firstName,
      message: user1.message
    },
    user2: {
      id: user2.id,
      email: user2.email,
      name: user2.firstName,
      message: user2.message
    }
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

//send email

app.post("/api/send", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "d3dknprfuzhco4pu@ethereal.email",
      pass: "2dvqG9MMGNMGXFT97x"
    }
  });

  const output1 = `
  <p>${req.body.match.user1.message}</p>
  <p><a href="">Message ${req.body.match.user2.name} to set up the date.</a></p>
  <p><a href="">If your friend isn't available anymore, click here and we'll stop emailing you.</a></p>
  <p><a href="">If you know someone who has a friend they want to set up, click here.</a></p>
  `;

  // setup email data with unicode symbols
  let mailOptions1 = {
    from: '"Blind Date" <d3dknprfuzhco4pu@ethereal.email>', // sender address
    to: req.body.match.user1.email, // list of receivers
    subject: "Blind Date Match", // Subject line
    text: output1, // plain text body
    html: output1 // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });

  const output2 = `
  <p>${req.body.match.user2.message}</p>
  <p><a href="">Message ${req.body.match.user1.name} to set up the date.</a></p>
  <p><a href="">If your friend isn't available anymore, click here and we'll stop emailing you.</a></p>
  <p><a href="">If you know someone who has a friend they want to set up, click here.</a></p>
  `;

  // setup email data with unicode symbols
  let mailOptions2 = {
    from: '"Blind Date" <d3dknprfuzhco4pu@ethereal.email>', // sender address
    to: req.body.match.user2.email, // list of receivers
    subject: "Blind Date Match", // Subject line
    text: output2, // plain text body
    html: output2 // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  console.log(req.body);
  res.send("sent");
});

// Match listing api

app.get("/api/matches", (req, res) => {
  Match.find({}, "user1 message1 user2 message2", function(error, matches) {
    res.json(matches);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
