// models/ChatbotResponse.js
const mongoose = require('mongoose');

const ChatbotResponseSchema = new mongoose.Schema({
  keywords: { type: [String], required: true }, // Array of keywords
  response: { type: String, required: true } // The chatbot response
});

module.exports = mongoose.model('chatbotresponse', ChatbotResponseSchema);
