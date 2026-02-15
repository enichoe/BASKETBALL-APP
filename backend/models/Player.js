const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  posicion: {
    type: String,
    required: true,
  },
  equipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  puntos: {
    type: Number,
    default: 0,
  },
  rebotes: {
    type: Number,
    default: 0,
  },
  asistencias: {
    type: Number,
    default: 0,
  },
  faltas: {
    type: Number,
    default: 0,
  },
  suspendido: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Player", playerSchema);
