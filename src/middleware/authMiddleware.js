const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(404).json({ message: "Unauthorized. Token not found" });
    }

    const decoded = jwt.verify(token, "shh");
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in authMiddlware" });
  }
}

module.exports = authMiddleware;
