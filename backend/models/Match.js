const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  equipoA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  equipoB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  puntosA: {
    type: Number,
    default: null,
  },
  puntosB: {
    type: Number,
    default: null,
  },
  estado: {
    type: String,
    enum: ["proximo", "finalizado"],
    required: true,
  },
});

module.exports = mongoose.model("Match", matchSchema);
