const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getTeams).post(protect, admin, createTeam);
router
  .route("/:id")
  .get(getTeamById)
  .put(protect, admin, updateTeam)
  .delete(protect, admin, deleteTeam);

module.exports = router;
