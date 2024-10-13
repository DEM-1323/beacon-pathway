// server.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5000', // Adjust based on your frontend's origin
  credentials: true // Allow cookies to be sent
}));
app.use(express.json({ extended: false })); // Parse JSON bodies
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);

// Protected Dashboard Route
const auth = require('./middleware/auth'); // Import auth middleware

app.get('/dashboard', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
