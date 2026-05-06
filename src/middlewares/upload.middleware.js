const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==============================
// ENSURE UPLOAD DIRECTORY EXISTS
// ==============================
const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// ==============================
// STORAGE CONFIG
// ==============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ==============================
// FILE FILTER (SECURE)
// ==============================
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/pdf"
  ];

  const allowedExt = [".pdf"];

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExt.includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only valid PDF files are allowed"));
  }
};

// ==============================
// MULTER INSTANCE
// ==============================
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit (important for stability)
  }
});

module.exports = upload;