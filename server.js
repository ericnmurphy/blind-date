const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// const key = require("./key");

const User = require("./models/User.js");
const Match = require("./models/Match.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));

//load & use routes
const adminMatches = require("./routes/admin/matches");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    process.env.mongoURI || require("./key"),
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set up Nodemailer

const config = require("./helpers/nodemailer");
const siteUrl = config.siteUrl;
const transporter = config.transporter;

// Create match function

const createMatch = (user1, user2) => {
  user1.message = `Hi ${user1.firstName},

Here's the Blind Date for your friend.

${user1.firstName}, ${user1.profession}, ${user1.company} (${
    user1.website
  }) knows their friend through ${user1.association.toLowerCase()}. ${
    user1.gender === "man" ? "He's" : "She's"
  } ${
    user1.height === "medium" ? "of medium build" : user1.height
  }, ${user1.adjective1.toLowerCase()}, ${user1.adjective2.toLowerCase()}, ${user1.adjective3.toLowerCase()}, ${user1.adjective4.toLowerCase()}, ${user1.adjective5.toLowerCase()} and ${user1.adjective6.toLowerCase()}. ${
    user1.gender === "man"
      ? `He ${
          user1.beard === "stubble" ? `has ${user1.beard}` : `is ${user1.beard}`
        }.`
      : `Her best quality is ${user1.bestQuality.toLowerCase()}.`
  } You're most likely to find ${
    user1.gender === "man" ? "him" : "her"
  } ${user1.haunt.toLowerCase()}.`;

  user2.message = `Hi ${user2.firstName},

Here's the Blind Date for your friend.

${user2.firstName}, ${user2.profession}, ${user2.company} (${
    user2.website
  }) knows their friend through ${user2.association.toLowerCase()}. ${
    user2.gender === "man" ? "He's" : "She's"
  } ${
    user2.height === "medium" ? "of medium build" : user2.height
  }, ${user2.adjective1.toLowerCase()}, ${user2.adjective2.toLowerCase()}, ${user2.adjective3.toLowerCase()}, ${user2.adjective4.toLowerCase()}, ${user2.adjective5.toLowerCase()} and ${user2.adjective6.toLowerCase()}. ${
    user2.gender === "man"
      ? `He ${
          user2.beard === "stubble" ? `has ${user2.beard}` : `is ${user2.beard}`
        }.`
      : `Her best quality is ${user2.bestQuality.toLowerCase()}.`
  } You're most likely to find ${
    user2.gender === "man" ? "him" : "her"
  } ${user2.haunt.toLowerCase()}.`;

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
  console.log("ancestors", user.ancestors);
  const params = {
    gender: matchGender,
    socioeconomic: user.socioeconomic,
    age: { $gte: user.age - 5, $lte: user.age + 5 },
    _id: { $in: user.ancestors }
  };
  User.find(
    params,
    "id email firstName profession company website gender association height adjective1 adjective2 adjective3 adjective4 adjective5 adjective6 beard bestQuality haunt",
    function(err, users) {
      if (err) {
        return handleError(err);
      } else {
        console.log(users);
        users.forEach(singleUser => {
          const user2 = singleUser;
          console.log("user.id", user.id);
          console.log("user2.id", user2.id);
          Match.findOne({ "user1.id": user.id, "user2.id": user2.id }, function(
            err,
            result
          ) {
            console.log("result", result);
            if (!result) {
              createMatch(user, user2);
            }
          });
        });
      }
    }
  );
};

// Referral form signup

app.post("/api/form", (req, res) => {
  console.log(req.body);

  User.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, function(
    err,
    newUser
  ) {
    res.send("saved to database");
    findMatch(newUser);
  });
});

//send email invite
sendInvite = user => {
  const inviteText = `Hi.\n\nWe heard you have someone to set up.\n\nCopy and paste the URL. ${siteUrl}${
    user.id
  }`;

  const inviteHtml = `
  <p>Hi.</p>
  <p>We heard you have someone to set up.</p>
  <p><span style="background-color: yellow"><a href="${siteUrl}${
    user.id
  }">Click here.</a></span></p>
  `;

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Blind Date" <d3dknprfuzhco4pu@ethereal.email>', // sender address
    to: user.email, // list of receivers
    subject: "Blind Date Invite", // Subject line
    text: inviteText, // plain text body
    html: inviteHtml // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

//send invite to matcher

app.post("/api/invite", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, function(err, result) {
    if (!result) {
      //if email doesn't already exist...
      const user = new User(req.body);
      console.log(user);
      user.save(function(err, newUser) {
        res.send("saved to database");
        sendInvite(newUser);
      });
    } else {
      res.status(400);
      res.send("This email has already been invited.");
    }
  });
});

// get email from user id

app.get("/api/email", (req, res) => {
  console.log(req.query.id);
  User.findById(req.query.id, "email firstName ancestors", function(
    error,
    match
  ) {
    if (error) {
      res.status(400);
      res.send(
        "There's no user with this ID. Check the URL from your email and try again."
      );
    } else {
      console.log(match);
      if (match.firstName) {
        res.status(400);
        res.send("You've already set up your friend.");
      } else {
        res.json(match);
      }
    }
  });
});

//check if ID exists

app.get("/api/invite-friend", (req, res) => {
  User.findById(req.query.id, "firstName ancestors", function(error, match) {
    if (error) {
      res.status(400);
      res.send(
        "There's no user with this ID. Check the URL from your email and try again."
      );
    } else {
      if (!match.firstName) {
        res.status(400);
        res.send(
          "You need to set up your friend first. Please refer to your email."
        );
      } else {
        res.send(match.ancestors);
      }
    }
  });
});

//send email

app.post("/api/send", (req, res) => {
  const output1 = `
  <p>${req.body.match.user1.message}</p>
  <p><a href="">Message ${req.body.match.user2.name} to set up the date.</a></p>
  <p><a href="">If your friend isn't available anymore, click here and we'll stop emailing you.</a></p>
  <p><a href="${siteUrl}/invite/${
    req.body.match.user1.id
  }">If you know someone who has a friend they want to set up, click here.</a></p>
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
  <p><a href="${siteUrl}/invite/${
    req.body.match.user2.id
  }">If you know someone who has a friend they want to set up, click here.</a></p>
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
  Match.findByIdAndRemove(req.body.match._id, () => {
    res.send("Sent and removed.");
  });
});

// User listing api

app.get("/api/users", (req, res) => {
  User.find({}, function(error, users) {
    res.json(users);
  });
});

// Match listing api

app.get("/api/matches", (req, res) => {
  Match.find({}, "user1 message1 user2 message2", function(error, matches) {
    res.json(matches);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//use routes

app.use("/api/admin/matches", adminMatches);

app.listen(port, () => console.log(`Listening on port ${port}`));
