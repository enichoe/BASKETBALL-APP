const express = require("express");
const router = express.Router();
const {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controllers/playerController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getPlayers).post(protect, admin, createPlayer);
router
  .route("/:id")
  .get(getPlayerById)
  .put(protect, admin, updatePlayer)
  .delete(protect, admin, deletePlayer);

module.exports = router;
