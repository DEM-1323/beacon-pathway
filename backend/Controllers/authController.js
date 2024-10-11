// controllers/authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({ msg: "User registered successfully", redirectUrl: "/dashboard" });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).send("Server error");
  }
};
