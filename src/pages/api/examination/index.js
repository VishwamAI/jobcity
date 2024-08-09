const Task = require('../../../../models/Task');
const jwt = require('jsonwebtoken');
const connectDB = require('../../../utils/db');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      // Return all tasks
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
  } else if (req.method === 'POST') {
    authenticateToken(req, res, async () => {
      try {
        // Create a new task
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
      } catch (error) {
        res.status(400).json({ message: 'Error creating task', error: error.message });
      }
    });
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
