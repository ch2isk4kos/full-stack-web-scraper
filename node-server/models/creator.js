const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
  id: Number,
  handle: String,
  img: String,
});

const creator = mongoose.model("creator", CreatorSchema, "Creators");

module.exports = { creator };
