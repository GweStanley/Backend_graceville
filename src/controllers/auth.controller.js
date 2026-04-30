const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// LOGIN ONLY
exports.login = async (req, res) => {
  try {
    const { name, matricule } = req.body;

    const user = await User.findOne({
      name: name.trim(),
      matricule: matricule.toUpperCase(),
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        matricule: user.matricule,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};