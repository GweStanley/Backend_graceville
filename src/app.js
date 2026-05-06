const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form-data fields

// ======================
// ENSURE UPLOADS DIR EXISTS
// ======================
const uploadDir = path.resolve(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================
// STATIC FILES (UPLOADS)
// ======================
app.use("/uploads", express.static(uploadDir));

// ======================
// ROUTES
// ======================
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const assignmentRoutes = require("./routes/assignment.routes");
const lessonRoutes = require("./routes/lesson.routes");
const libraryRoutes = require("./routes/library.routes");
const announcementRoutes = require("./routes/announcement.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/library", libraryRoutes);
app.use("/uploads", require("express").static(path.join(__dirname, "../uploads")));

// ======================
// HEALTH CHECK
// ======================
app.get("/api", (req, res) => {
  res.json({ status: "Graceville API running 🚀" });
});

// ======================
// 404 HANDLER (after all routes)
// ======================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ======================
// ERROR HANDLER (last)
// ======================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  // Multer errors or custom errors
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;