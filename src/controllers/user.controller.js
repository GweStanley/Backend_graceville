const User = require("../models/User");

// CREATE USER (admin only later)
exports.createUser = async (req, res) => {
  try {
    const { name, matricule, role } = req.body;

    const exists = await User.findOne({ matricule });
    if (exists) {
      return res.status(400).json({ message: "Matricule already exists" });
    }

    const user = await User.create({
      name,
      matricule: matricule.toUpperCase(),
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};