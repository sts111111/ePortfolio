// app.js - Main server file
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)){
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Contact form submission route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Here you would normally handle sending an email or saving to a database
  console.log('Contact Form Submission:', { name, email, message });
  
  // For now, just return a success message
  res.json({ success: true, message: 'Message received! Thank you for contacting me.' });
});

// Serve the index.html file for all routes (Single Page Application approach)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});