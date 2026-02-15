const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Group", groupSchema);
