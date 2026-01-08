const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/asyncHandler')

router.get("/", authMiddleware, asyncHandler(async (req, res) => {
  res.json({
    user: req.user,
  })
}));


module.exports = router;
