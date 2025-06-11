const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
      return res.status(403).json({ message: 'Access token is required' });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error('ACCESS_TOKEN_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Server error: Missing JWT secret' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; //attach the information
    next(); 
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
