const express = require("express");

const { authService } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", async (req, res) => {
  return authService.register(req, res);
});

module.exports = router;
