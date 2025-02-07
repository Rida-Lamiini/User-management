const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user; // Attach user to request
    next();
  });
};

module.exports = authenticateToken;
