const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

// ✅ Required
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const courseRoutes = require("./routes/course.routes");
app.use("/api/courses", courseRoutes);
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;