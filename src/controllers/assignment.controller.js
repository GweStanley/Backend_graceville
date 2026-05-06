const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

// CREATE ASSIGNMENT
exports.createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      course,
      dueDate
    } = req.body;

    const fileUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const assignment = await Assignment.create({
      title,
      description,
      course,
      dueDate,
      teacher: req.user.id,
      fileUrl
    });

    res.status(201).json(assignment);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL ASSIGNMENTS
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SUBMIT ASSIGNMENT
exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId, answer } = req.body;

    if (!assignmentId) {
      return res.status(400).json({ message: "Assignment required" });
    }

    // prevent duplicate submission
    const existing = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id
    });

    if (existing) {
      return res.status(400).json({
        message: "You already submitted this assignment"
      });
    }

    const submission = await Submission.create({
      assignment: assignmentId,
      student: req.user.id,
      answer: answer || "",
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SUBMISSIONS (TEACHER)
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("student", "name matricule")
      .populate("assignment", "title");

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GRADE SUBMISSION
exports.gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;

    if (grade == null) {
      return res.status(400).json({ message: "Grade required" });
    }

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { grade, feedback },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// STUDENT RESULTS
exports.getMyResults = async (req, res) => {
  try {
    const results = await Submission.find({
      student: req.user.id
    })
      .populate("assignment", "title maxScore")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};