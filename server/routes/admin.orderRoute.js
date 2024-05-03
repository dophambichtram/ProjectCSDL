const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// BASE URL : /admin/order
// req : query : pageSize, pageSize
router.get("/", async (req, res) => {
  const pageSize = req.query?.pageSize || 20;
  const pageIndex = req.query?.pageSize || 1;
  const offset = (pageIndex - 1) * pageSize;
  try {
    const orders = await Order.find().skip(offset).limit(pageSize);
    const totalItems = await Order.countDocuments();

    res.json({ data: orders, totalItems });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("An error occurred while trying to fetch products.");
  }
});

module.exports = router;
