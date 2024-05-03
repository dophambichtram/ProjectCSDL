const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "ADMIN" });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "shineaura",
      { expiresIn: "365d" }
    );
    res.json({
      jwtToken: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    // Handle different types of errors
    if (error.name === "ValidationError") {
      // MongoDB validation error
      return res
        .status(400)
        .json({ message: "Validation error", details: error.message });
    } else {
      // Server error
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});

module.exports = router;
