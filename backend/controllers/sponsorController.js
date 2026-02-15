const Sponsor = require("../models/Sponsor");

// @desc    Get all sponsors
// @route   GET /api/sponsors
// @access  Public
const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({});
    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single sponsor
// @route   GET /api/sponsors/:id
// @access  Public
const getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (sponsor) {
      res.status(200).json(sponsor);
    } else {
      res.status(404).json({ message: "Sponsor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a sponsor
// @route   POST /api/sponsors
// @access  Private (Admin)
const createSponsor = async (req, res) => {
  const { nombre, logo, link } = req.body;

  if (!nombre || !logo) {
    return res.status(400).json({ message: "Please enter sponsor name and logo" });
  }

  try {
    const sponsorExists = await Sponsor.findOne({ nombre });
    if (sponsorExists) {
      return res.status(400).json({ message: "Sponsor already exists" });
    }

    const sponsor = new Sponsor({
      nombre,
      logo,
      link: link || ''
    });

    const createdSponsor = await sponsor.save();
    res.status(201).json(createdSponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a sponsor
// @route   PUT /api/sponsors/:id
// @access  Private (Admin)
const updateSponsor = async (req, res) => {
  const { nombre, logo, link } = req.body;

  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (sponsor) {
      sponsor.nombre = nombre || sponsor.nombre;
      sponsor.logo = logo || sponsor.logo;
      sponsor.link = link || sponsor.link;

      const updatedSponsor = await sponsor.save();
      res.status(200).json(updatedSponsor);
    } else {
      res.status(404).json({ message: "Sponsor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a sponsor
// @route   DELETE /api/sponsors/:id
// @access  Private (Admin)
const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (sponsor) {
      await sponsor.deleteOne();
      res.status(200).json({ message: "Sponsor removed" });
    } else {
      res.status(404).json({ message: "Sponsor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
};
