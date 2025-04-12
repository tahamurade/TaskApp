const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Import the middleware

const tasksFile = './data/tasks.json';

// Apply authMiddleware to all task routes
router.use(authMiddleware);

// Add Task
router.post('/add', (req, res) => {
  const { username } = req.user; // Get username from middleware
  const { title, description } = req.body;
  const tasksData = jsonfile.readFileSync(tasksFile);

  const newTask = {
    id: Date.now(),
    username,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasksData.tasks.push(newTask);
  jsonfile.writeFileSync(tasksFile, tasksData);

  res.json({ message: 'Task added', task: newTask });
});

// View Tasks
router.post('/view', (req, res) => {
  const { username } = req.user; // Get username from middleware
  const tasksData = jsonfile.readFileSync(tasksFile);

  const userTasks = tasksData.tasks.filter((task) => task.username === username);
  res.json(userTasks);
});

// Complete Task
router.post('/complete', (req, res) => {
  const { taskId } = req.body;
  const { username } = req.user; // Get username from middleware
  const tasksData = jsonfile.readFileSync(tasksFile);

  const task = tasksData.tasks.find((t) => t.id === taskId && t.username === username);
  if (!task) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  task.completed = true;
  jsonfile.writeFileSync(tasksFile, tasksData);

  res.json({ message: 'Task marked as completed' });
});

// Delete Task
router.post('/delete', (req, res) => {
  const { taskId } = req.body;
  const { username } = req.user; // Get username from middleware
  const tasksData = jsonfile.readFileSync(tasksFile);

  const taskIndex = tasksData.tasks.findIndex((t) => t.id === taskId && t.username === username);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found or unauthorized' });
  }

  tasksData.tasks.splice(taskIndex, 1);
  jsonfile.writeFileSync(tasksFile, tasksData);

  res.json({ message: 'Task deleted' });
});

module.exports = router;