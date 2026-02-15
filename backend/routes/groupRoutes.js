const express = require("express");
const router = express.Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getGroups).post(protect, admin, createGroup);
router
  .route("/:id")
  .get(getGroupById)
  .put(protect, admin, updateGroup)
  .delete(protect, admin, deleteGroup);

module.exports = router;
