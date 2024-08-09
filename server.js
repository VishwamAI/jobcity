const express = require('express');
const next = require('next');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB and start the server only if connection is successful
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  startServer();
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

function startServer() {
  app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);

    // Create WebSocket server on a separate port
    const WS_PORT = process.env.WS_PORT || 3005;
    const wss = new WebSocket.Server({ port: WS_PORT });

    console.log(`WebSocket server created on port ${WS_PORT}`);

    // WebSocket connection handler
    wss.on('connection', (ws, req) => {
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.log(`New WebSocket connection attempt from ${clientIp}`);

      ws.on('open', () => {
        console.log(`WebSocket connection established with ${clientIp}`);
        console.log(`Current number of connected clients: ${wss.clients.size}`);
      });

      ws.on('message', (message) => {
        console.log(`Received message from ${clientIp}:`, message.toString());
        console.log(`Message size: ${message.length} bytes`);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
            console.log(`Broadcasted message to client ${client._socket.remoteAddress}`);
          }
        });
      });

      ws.on('close', (code, reason) => {
        console.log(`WebSocket connection closed with ${clientIp}. Code: ${code}, Reason: ${reason}`);
        console.log(`Current number of connected clients: ${wss.clients.size}`);
      });

      ws.on('error', (error) => {
        console.error(`WebSocket error with ${clientIp}:`, error);
        console.error(`Error stack: ${error.stack}`);
      });

      // Log ping/pong events
      ws.on('ping', () => console.log(`Received ping from ${clientIp}`));
      ws.on('pong', () => console.log(`Received pong from ${clientIp}`));
    });

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

    const PORT = process.env.PORT || 3006;
    httpServer.listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err);
        throw err;
      }
      console.log(`> Ready on http://localhost:${PORT}`);
      console.log(`> WebSocket server is running on ws://localhost:${WS_PORT}`);
    });
  });
}

// Handle MongoDB connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});
