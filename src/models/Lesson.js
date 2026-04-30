const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: String,

    videoUrl: String,

    zoomLink: String,

    syllabusPdf: String, // file path or URL

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);