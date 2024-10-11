const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

const path = require('path'); // Include this at the top

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Send the register page when user accesses the root or /register
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
  });  

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
  });
  
app.use(cors());
app.use(express.json({ extended: false }));

// Use the authRoutes for handling user registration
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
