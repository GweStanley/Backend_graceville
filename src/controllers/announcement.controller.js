const Announcement = require("../models/Announcement");

// CREATE
exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      title: req.body.title,
      content: req.body.content,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdBy: req.user.id,
    });

    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL (PUBLIC)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ACTIVE ONLY (optional future use)
exports.getActiveAnnouncements = async (req, res) => {
  try {
    const now = new Date();

    const announcements = await Announcement.find({
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gt: now } },
      ],
    }).sort({ createdAt: -1 });

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};