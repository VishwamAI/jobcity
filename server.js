const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.prepare().then(() => {
  const server = express();

  // Serve static files from the 'public' directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Parse JSON bodies
  server.use(express.json());

  // API routes for examination coding modules
  server.use('/api/examination', require('./src/pages/api/examination'));

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
