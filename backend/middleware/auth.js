const jsonfile = require('jsonfile');

const usersFile = './data/users.json';

// Middleware to verify user authentication
const authMiddleware = (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    return res.status(401).json({ message: 'Unauthorized: Username is required' });
  }

  // Read users from JSON file
  const usersData = jsonfile.readFileSync(usersFile);

  // Check if user exists
  const user = usersData.users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  // Attach username to request for use in routes
  req.user = { username };
  next();
};

module.exports = authMiddleware;