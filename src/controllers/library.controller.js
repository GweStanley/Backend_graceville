const Library = require("../models/Library");

// ================= ADD MATERIAL =================
exports.addLibraryItem = async (req, res) => {
  try {
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!fileUrl) {
      return res.status(400).json({ message: "File is required" });
    }

    const item = await Library.create({
      title: req.body.title,
      fileUrl,
      uploadedBy: req.user.id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL MATERIALS =================
exports.getLibrary = async (req, res) => {
  try {
    const items = await Library.find()
      .populate("uploadedBy", "name role")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE MATERIAL =================
exports.deleteLibraryItem = async (req, res) => {
  try {
    await Library.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};