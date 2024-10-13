// backend/routes/authRoutes.js

const express = require('express');
const { register, login, logout } = require('../Controllers/authController');
const { check } = require('express-validator');
const router = express.Router();

// Registration Route with Validation
router.post('/register', [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('confirmPassword', 'Confirm Password is required').not().isEmpty()
], register);

// Login Route with Validation
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], login);

// Logout Route
router.post('/logout', logout);

module.exports = router;
