const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: '⛔ No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: '⛔ Invalid token' });
  }
};

const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    return next();
  }

  const userRole = req.header('x-user-role');
  if (userRole === 'teacher') return next();

  return res.status(403).json({ message: '⛔ Access denied. Teachers only.' });
};

module.exports = {
  authenticate,
  isTeacher
};
