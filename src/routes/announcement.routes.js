const router = require("express").Router();

const {
  createAnnouncement,
  getAnnouncements,
  getActiveAnnouncements,
  deleteAnnouncement,
} = require("../controllers/announcement.controller");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// PUBLIC
router.get("/", getAnnouncements);
router.get("/active", getActiveAnnouncements);

// ADMIN ONLY
router.post("/", protect, authorize("admin"), createAnnouncement);
router.delete("/:id", protect, authorize("admin"), deleteAnnouncement);

module.exports = router;