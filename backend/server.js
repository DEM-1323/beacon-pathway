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
const auth = require('./middleware/auth'); 

app.get('/dashboard', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.get('/homepage', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/homepage.html'));
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

app.get('/opportunities', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/opportunities.html'));
});

app.get('/beaconbot', (req,res)=> {
    res.sendFile(path.join(__dirname, '../frontend/beaconbot.html'));
})

app.get('/beacon_community', (req,res)=> {
    res.sendFile(path.join(__dirname, '../frontend/beacon_community.html'));
})

app.get('/api/opportunities', (req, res) => {
    const opportunities = [
        {
            id: 1,
            title: "PEAAI AI Symposium",
            description: "Discover innovative AI applications in education and industry at the Paul English AI Symposium.",
            image: "/images/PEAII.png"
        },
        {
            id: 2,
            title: "Computer Science Club",
            description: "Join the UMass Boston Computer Science Club to enhance your coding skills.",
            image: "/images/cs_club.jpg"
        },
        {
            id: 3,
            title: "CSS Battle Dev",
            description: "Sharpen your coding skills by competing in CSS dev battles.",
            image: "/images/css_battle.jpg"
        }
        // Add more opportunities as needed
    ];
    res.json(opportunities);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
