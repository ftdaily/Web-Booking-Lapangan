const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies?.token || null;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Auth error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden' });
};
