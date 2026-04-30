const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    matricule: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "parent", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);