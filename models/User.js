const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  socioeconomic: {
    type: Array
  },
  association: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  beard: {
    type: String
  },
  adjective1: {
    type: String,
    required: true
  },
  adjective2: {
    type: String,
    required: true
  },
  adjective3: {
    type: String,
    required: true
  },
  adjective4: {
    type: String,
    required: true
  },
  adjective5: {
    type: String,
    required: true
  },
  adjective6: {
    type: String,
    required: true
  },
  bestQuality: {
    type: String
  },
  haunt: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", UserSchema, "users");
module.exports = User;
