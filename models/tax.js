var mongoose = require("mongoose");

var taxSchema = new mongoose.Schema({
  type: String,
  label: String,
  rate: Number
});

module.exports = mongoose.model("Tax", taxSchema);