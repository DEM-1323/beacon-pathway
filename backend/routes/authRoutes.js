// routes/authRoutes.js
const express = require('express');
const { register } = require('../Controllers/authController'); 
const router = express.Router();

router.post('/register', register);

module.exports = router;
