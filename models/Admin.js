const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  password: String
});

const Admin = mongoose.model("Admin", AdminSchema, "admins");
module.exports = Admin;
