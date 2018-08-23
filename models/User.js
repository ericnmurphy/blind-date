const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
