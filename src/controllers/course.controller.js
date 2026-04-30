const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

/* =========================
   COURSES
========================= */

// CREATE COURSE (teacher/admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      teacher: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================
   LESSONS
========================= */

// ADD LESSON
exports.addLesson = async (req, res) => {
  try {
    const {
      title,
      content,
      videoUrl,
      zoomLink,
      courseId,
    } = req.body;

    const syllabusPdf = req.file ? req.file.path : null;

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      zoomLink,
      syllabusPdf,
      course: courseId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LESSONS BY COURSE
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
    });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};