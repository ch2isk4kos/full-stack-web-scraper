const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
  StudentId: Number,
  Name: String,
  Roll: Number,
  Birthday: Date,
  Address: String,
});

const creator = mongoose.model("creator", CreatorSchema, "Creators");

module.exports = { creator };
