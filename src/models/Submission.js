const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  answer: String,
  fileUrl: String,

  grade: Number,
  feedback: String
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);