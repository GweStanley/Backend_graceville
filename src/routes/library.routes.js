const router = require("express").Router();

const {
  addLibraryItem,
  getLibrary,
  deleteLibraryItem,
} = require("../controllers/library.controller");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const upload = require("../middlewares/upload.middleware");

// ================= PUBLIC VIEW =================
router.get("/", getLibrary);

// ================= ADMIN ONLY =================
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("file"),
  addLibraryItem
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteLibraryItem
);

module.exports = router;