const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  profession: {
    type: String
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  socioeconomic: {
    type: Array
  },
  association: {
    type: String
  },
  height: {
    type: String
  },
  beard: {
    type: String
  },
  adjective1: {
    type: String
  },
  adjective2: {
    type: String
  },
  adjective3: {
    type: String
  },
  adjective4: {
    type: String
  },
  adjective5: {
    type: String
  },
  adjective6: {
    type: String
  },
  bestQuality: {
    type: String
  },
  haunt: {
    type: String
  },
  ancestors: {
    type: Array
  },
  status: {
    type: String,
    default: "pending"
  }
});

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;
