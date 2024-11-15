const mongoose = require("mongoose");

// Counter Schema to keep track of userId
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };
