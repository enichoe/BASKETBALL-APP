const Group = require("../models/Group");

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single group
// @route   GET /api/groups/:id
// @access  Public
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a group
// @route   POST /api/groups
// @access  Private (Admin)
const createGroup = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "Please enter a group name" });
  }

  try {
    const groupExists = await Group.findOne({ nombre });
    if (groupExists) {
      return res.status(400).json({ message: "Group already exists" });
    }

    const group = new Group({
      nombre,
    });

    const createdGroup = await group.save();
    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a group
// @route   PUT /api/groups/:id
// @access  Private (Admin)
const updateGroup = async (req, res) => {
  const { nombre } = req.body;

  try {
    const group = await Group.findById(req.params.id);
    if (group) {
      group.nombre = nombre || group.nombre;

      const updatedGroup = await group.save();
      res.status(200).json(updatedGroup);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a group
// @route   DELETE /api/groups/:id
// @access  Private (Admin)
const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (group) {
      await group.deleteOne();
      res.status(200).json({ message: "Group removed" });
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
