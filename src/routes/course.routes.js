const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  createCourse,
  getCourses,
  addLesson,
  getLessons,
} = require("../controllers/course.controller");

// COURSES
router.get("/", protect, getCourses);
router.post("/", protect, authorize("teacher", "admin"), createCourse);

// LESSONS
router.post(
  "/lesson",
  protect,
  authorize("teacher", "admin"),
  upload.single("syllabusPdf"),
  addLesson
);

router.get("/:courseId/lessons", protect, getLessons);

module.exports = router;