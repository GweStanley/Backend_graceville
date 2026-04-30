const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

// ONLY ADMIN CAN CREATE USERS
router.post("/", protect, authorize("admin"), createUser);

module.exports = router;