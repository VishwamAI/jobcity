import Task from '../../../models/Task';
import jwt from 'jsonwebtoken';

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

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      await handleGetTask(res, id);
      break;
    case 'PUT':
      authenticateToken(req, res, async () => await handleUpdateTask(req, res, id));
      break;
    case 'DELETE':
      authenticateToken(req, res, async () => await handleDeleteTask(res, id));
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGetTask(res, id) {
  try {
    const task = await Task.findById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task', error: error.message });
  }
}

async function handleUpdateTask(req, res, id) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
}

async function handleDeleteTask(res, id) {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
}
