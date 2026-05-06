const Lesson = require("../models/Lesson");

// GET LESSONS BY COURSE (MATCHES YOUR FRONTEND)
exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.id,
    }).sort({ createdAt: 1 });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE LESSON
exports.createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create({
      ...req.body,
      teacher: req.user.id,
    });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};