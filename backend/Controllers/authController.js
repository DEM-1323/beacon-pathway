// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { validationResult } = require('express-validator');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id 
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) throw err;
        res
          .cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Prevent CSRF
            maxAge: 3600000 // 1 hour in milliseconds
          })
          .status(200)
          .json({ 
            msg: "User registered successfully", 
            redirectUrl: "/dashboard" 
          });
      }
    );

  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Login user and return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  // Validate incoming request using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return validation errors to the client
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign JWT and set it in an HTTP-only cookie
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your .env file
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        // Set token in HTTP-only cookie for security
        res
          .cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF
            maxAge: 3600000 // 1 hour in milliseconds
          })
          .status(200)
          .json({ 
            msg: "Logged in successfully", 
            redirectUrl: "/dashboard" 
          });
      }
    );

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Logout user by clearing the JWT cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
exports.logout = (req, res) => {
  try {
    res
      .clearCookie('token', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Ensure it matches the cookie settings
        sameSite: 'strict'
      })
      .status(200)
      .json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
