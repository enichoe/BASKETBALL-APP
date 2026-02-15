const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: false,
    default: 'https://via.placeholder.com/150'
  },
  color: {
    type: String,
    required: true,
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
