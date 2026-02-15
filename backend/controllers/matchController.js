const Match = require("../models/Match");

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate("equipoA", "nombre logo color")
      .populate("equipoB", "nombre logo color");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single match
// @route   GET /api/matches/:id
// @access  Public
const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("equipoA", "nombre logo color")
      .populate("equipoB", "nombre logo color");
    if (match) {
      res.status(200).json(match);
    } else {
      res.status(404).json({ message: "Match not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a match
// @route   POST /api/matches
// @access  Private (Admin)
const createMatch = async (req, res) => {
  const { fecha, horario, ubicacion, equipoA, equipoB, puntosA, puntosB, estado } = req.body;

  if (!fecha || !horario || !ubicacion || !equipoA || !equipoB) {
    return res.status(400).json({ message: "Por favor complete los campos obligatorios del partido" });
  }

  try {
    const match = new Match({
      fecha,
      horario,
      ubicacion,
      equipoA,
      equipoB,
      puntosA: puntosA !== '' ? puntosA : null,
      puntosB: puntosB !== '' ? puntosB : null,
      estado: estado || 'proximo',
    });

    const createdMatch = await match.save();
    res.status(201).json(createdMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a match
// @route   PUT /api/matches/:id
// @access  Private (Admin)
const updateMatch = async (req, res) => {
  const { fecha, horario, ubicacion, equipoA, equipoB, puntosA, puntosB, estado } = req.body;

  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      match.fecha = fecha || match.fecha;
      match.horario = horario || match.horario;
      match.ubicacion = ubicacion || match.ubicacion;
      match.equipoA = equipoA || match.equipoA;
      match.equipoB = equipoB || match.equipoB;
      match.puntosA = puntosA !== undefined ? puntosA : match.puntosA;
      match.puntosB = puntosB !== undefined ? puntosB : match.puntosB;
      match.estado = estado || match.estado;

      const updatedMatch = await match.save();
      res.status(200).json(updatedMatch);
    } else {
      res.status(404).json({ message: "Match not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a match
// @route   DELETE /api/matches/:id
// @access  Private (Admin)
const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match) {
      await match.deleteOne();
      res.status(200).json({ message: "Match removed" });
    } else {
      res.status(404).json({ message: "Match not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
};
