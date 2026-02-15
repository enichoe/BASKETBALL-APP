const Team = require("../models/Team");

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).populate("players");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a team
// @route   POST /api/teams
// @access  Private (Admin)
const createTeam = async (req, res) => {
  console.log("[TEAM DEBUG] Create Request Body:", req.body);
  const { nombre, logo, color, grupo } = req.body;

  if (!nombre) {
    console.log("[TEAM DEBUG] Falta nombre");
    return res.status(400).json({ message: "Por favor ingresa nombre del equipo" });
  }

  try {
    const teamExists = await Team.findOne({ nombre });
    if (teamExists) {
      console.log("[TEAM DEBUG] El equipo ya existe:", nombre);
      return res.status(400).json({ message: "El equipo ya existe" });
    }

    const team = new Team({
      nombre,
      logo,
      color: color || '#000000',
      grupo,
      players: []
    });

    const createdTeam = await team.save();
    console.log("[TEAM DEBUG] Equipo creado:", createdTeam._id);
    res.status(201).json(createdTeam);
  } catch (error) {
    console.error("[TEAM DEBUG] Error creando equipo:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a team
// @route   PUT /api/teams/:id
// @access  Private (Admin)
const updateTeam = async (req, res) => {
  const { nombre, logo, color, grupo } = req.body;

  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      team.nombre = nombre || team.nombre;
      team.logo = logo || team.logo;
      team.color = color || team.color;
      team.grupo = grupo || team.grupo;

      const updatedTeam = await team.save();
      res.status(200).json(updatedTeam);
    } else {
      res.status(404).json({ message: "Equipo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a team
// @route   DELETE /api/teams/:id
// @access  Private (Admin)
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (team) {
      await team.deleteOne();
      res.status(200).json({ message: "Team removed" });
    } else {
      res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
