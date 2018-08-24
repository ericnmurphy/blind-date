const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  user1: {
    type: String,
    required: true
  },
  user2: {
    type: String,
    required: true
  },
  message1: {
    type: String,
    required: true
  },
  message2: {
    type: String,
    required: true
  }
});

const Match = mongoose.model("Match", MatchSchema, "matches");
module.exports = Match;
