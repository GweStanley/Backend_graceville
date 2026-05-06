const router = require("express").Router();

const {
  createLesson,
  getLessonsByCourse,
} = require("../controllers/lesson.controller");

const protect = require("../middlewares/auth.middleware");

// CREATE LESSON
router.post("/", protect, createLesson);

// GET LESSONS BY COURSE (IMPORTANT FIX)
router.get("/:id", protect, getLessonsByCourse);

module.exports = router;