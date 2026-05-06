const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  // 🔥 file upload
  fileUrl: {
    type: String,
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);