const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");

const {
  createAssignment,
  getAssignments,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  getMyResults
} = require("../controllers/assignment.controller");

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");


// ======================
// TEACHER ROUTES
// ======================

// create assignment (WITH optional file upload)
router.post(
  "/",
  protect,
  authorize("teacher"),
  upload.single("file"),
  createAssignment
);

// view all submissions
router.get(
  "/submissions",
  protect,
  authorize("teacher"),
  getSubmissions
);

// grade submission
router.put(
  "/grade/:id",
  protect,
  authorize("teacher"),
  gradeSubmission
);


// ======================
// STUDENT ROUTES
// ======================

// get assignments
router.get(
  "/",
  protect,
  getAssignments
);

// submit assignment (WITH file upload)
router.post(
  "/submit",
  protect,
  upload.single("file"),
  submitAssignment
);

// get student results
router.get(
  "/my-results",
  protect,
  getMyResults
);

module.exports = router;