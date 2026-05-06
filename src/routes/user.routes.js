const router = require("express").Router();

const {
  createUser,
  getUsers,
  suspendUser,
  deleteUser
} = require("../controllers/user.controller");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ================= ADMIN ROUTES =================
router.post("/", protect, authorize("admin"), createUser);

router.get("/", protect, authorize("admin"), getUsers);

router.put("/suspend/:id", protect, authorize("admin"), suspendUser);

router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;