const multer = require("multer");
const path = require("path");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// file filter (ONLY PDF allowed for syllabus)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed for syllabus upload"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;