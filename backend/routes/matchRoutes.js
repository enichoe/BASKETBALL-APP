const express = require("express");
const router = express.Router();
const {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getMatches).post(protect, admin, createMatch);
router
  .route("/:id")
  .get(getMatchById)
  .put(protect, admin, updateMatch)
  .delete(protect, admin, deleteMatch);

module.exports = router;
