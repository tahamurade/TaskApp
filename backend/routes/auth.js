const express = require('express');
const jsonfile = require('jsonfile');
const bcrypt = require('bcryptjs');
const router = express.Router();

const usersFile = './data/users.json';

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const usersData = jsonfile.readFileSync(usersFile);

  if (usersData.users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  usersData.users.push({ username, password: hashedPassword });
  jsonfile.writeFileSync(usersFile, usersData);

  res.status(201).json({ message: 'User created successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const usersData = jsonfile.readFileSync(usersFile);

  const user = usersData.users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // In a real app, use JWT for tokens
  res.json({ message: 'Login successful', username });
});

module.exports = router;