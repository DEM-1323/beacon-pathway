const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');
const ChatbotResponse = require('./models/ChatbotResponse');
const auth = require('./middleware/auth'); // Import auth middleware

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
// app.use(cors({
 // origin: 'http://localhost:5000', // Adjust based on your frontend's origin or allow multiple domains
 // credentials: true // Allow cookies to be sent
// }));

app.use(express.json());
 // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);

// Chatbot API route
// Chatbot API route
app.post('/api/chatbot', async (req, res) => {
    console.log('Received message:', req.body);
    const userMessage = req.body.message;
  
    if (!userMessage) {
      console.error('No message provided in request body.');
      return res.status(400).json({ error: 'No message provided.' });
    }
  
    try {
      const response = await ChatbotResponse.findOne({
        keywords: { $in: [userMessage.toLowerCase()] }
      });
  
      if (response) {
        console.log('Found response:', response);
        return res.json({ response: response.response });
      } else {
        console.log('No matching response found.');
        return res.json({ response: "I'm sorry, I didn't understand that. Can you try rephrasing?" });
      }
    } catch (err) {
      console.error('Error in chatbot route:', err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  

// Protected routes (for logged-in users)
app.get('/dashboard', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

app.get('/homepage', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/homepage.html'));
});

// Serve other HTML pages
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

app.get('/beaconbot', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/beaconbot.html'));
});

app.get('/beacon_community', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/beacon_community.html'));
});

app.get('/Schedule_Builder', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Schedule_Builder.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/settings.html'));
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/logout.html'));
});

// Catch-all error handler for unsupported routes
app.use((req, res) => {
  res.status(404).send("404: Page not found.");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
