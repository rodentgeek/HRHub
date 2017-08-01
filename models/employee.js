var mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  city: String,
  state: String,
  job: String,
  ssn: String,
  cNumber: Number,
  salary: Number,
  vacayallot: Number,
  vacayused: Number
});

module.exports = mongoose.model("Employee", employeeSchema);