const mongoose = require("mongoose");

const CreateProjectSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  mobile: String,
  project: String,
});

module.exports = mongoose.model("client", CreateProjectSchema);
