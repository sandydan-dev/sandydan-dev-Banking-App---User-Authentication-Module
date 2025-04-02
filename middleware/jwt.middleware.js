const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      {
        user: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1y" }
    );

    if (!token) {
      return "Token not found";
    }

    return token;
  } catch (error) {
    return "Error while generating token";
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid or missing Authorization header" });
    }

    const token = authHeader.split(" ")[1]; // extract token from header

    if (!token) {
      return res.status(401).json({ message: "Token not provided, Access denied..." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Failed to authenticate token.", error });
  }
};

module.exports = { generateToken, verifyToken };
