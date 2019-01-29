const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Match = require("../../models/Match.js");

//save update to messages
router.post("/save", (req, res) => {
  Match.findOneAndUpdate(
    { _id: req.body.id },
    {
      "user1.message": req.body.message1,
      "user2.message": req.body.message2
    },
    () => {
      res.send("updated");
    }
  );
});

//delete match
router.delete("/delete", (req, res) => {
  Match.findByIdAndRemove(req.body.id, () => {
    res.send("Deleted.");
  });
});

module.exports = router;
