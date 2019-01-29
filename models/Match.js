const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  user1: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  user2: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    default: "active"
  },
  sentDate: {
    type: Date
  }
});

const Match = mongoose.model("Match", MatchSchema, "matches");
module.exports = Match;
