const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
  id: String,
  handle: String,
  img: String,
});

// const creator = mongoose.model("creator", CreatorSchema, "Creators");
// module.exports = { creator };
module.exports = mongoose.model("creator", CreatorSchema, "Creators");
