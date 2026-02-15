const Player = require("../models/Player");

// @desc    Get all players
// @route   GET /api/players
// @access  Public
const getPlayers = async (req, res) => {
  try {
    const players = await Player.find({}).populate("equipo");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single player
// @route   GET /api/players/:id
// @access  Public
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("equipo");
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a player
// @route   POST /api/players
// @access  Private (Admin)
const createPlayer = async (req, res) => {
  console.log("[PLAYER DEBUG] Request Body:", req.body);
  // Corregido: nombre, edad, posicion, equipo, image
  const { nombre, edad, posicion, equipo, image } = req.body;

  if (!nombre || !edad || !posicion || !equipo) {
    console.log("[PLAYER DEBUG] Campos faltantes");
    return res.status(400).json({ message: "Por favor ingresa todos los campos obligatorios" });
  }

  try {
    const playerExists = await Player.findOne({ nombre, equipo });
    if (playerExists) {
        console.log("[PLAYER DEBUG] Jugador duplicado");
      return res.status(400).json({ message: "El jugador ya existe en este equipo" });
    }

    const player = new Player({
      nombre,
      edad: Number(edad),
      posicion,
      equipo,
      image,
      puntos: 0,
      rebotes: 0,
      asistencias: 0,
      faltas: 0
    });

    const createdPlayer = await player.save();
    console.log("[PLAYER DEBUG] Creado ID:", createdPlayer._id);
    res.status(201).json(createdPlayer);
  } catch (error) {
    console.error("[PLAYER DEBUG] Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a player
// @route   PUT /api/players/:id
// @access  Private (Admin)
const updatePlayer = async (req, res) => {
  const { nombre, edad, posicion, equipo, image, puntos, rebotes, asistencias, faltas, suspendido } = req.body;

  try {
    const player = await Player.findById(req.params.id);
    if (player) {
      player.nombre = nombre || player.nombre;
      player.edad = edad || player.edad;
      player.posicion = posicion || player.posicion;
      player.equipo = equipo || player.equipo;
      player.image = image || player.image;
      if (puntos !== undefined) player.puntos = puntos;
      if (rebotes !== undefined) player.rebotes = rebotes;
      if (asistencias !== undefined) player.asistencias = asistencias;
      if (faltas !== undefined) player.faltas = faltas;
      if (suspendido !== undefined) player.suspendido = suspendido;

      const updatedPlayer = await player.save();
      res.status(200).json(updatedPlayer);
    } else {
      res.status(404).json({ message: "Jugador no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a player
// @route   DELETE /api/players/:id
// @access  Private (Admin)
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player) {
      await player.deleteOne();
      res.status(200).json({ message: "Player removed" });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
