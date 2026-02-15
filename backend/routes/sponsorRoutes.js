const express = require("express");
const router = express.Router();
const {
  getSponsors,
  getSponsorById,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} = require("../controllers/sponsorController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getSponsors).post(protect, admin, createSponsor);
router
  .route("/:id")
  .get(getSponsorById)
  .put(protect, admin, updateSponsor)
  .delete(protect, admin, deleteSponsor);

module.exports = router;
