const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/cart");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");

// BASE URL : Order
//body : products : [{productId, quantity, productPrice}]
//header : token
function generateRandomNumber() {
  const timestamp = new Date().getTime().toString();
  const randomNumber = parseInt(timestamp.slice(-5)); // Lấy 5 ký tự cuối của timestamp
  return randomNumber.toString().padStart(5, "0"); // Chắc chắn có 5 ký tự
}

router.post("/", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { products, recipientInformation, totalPrice } = req.body;

  try {
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products not found" });
    }

    const productsFound = await Product.find()
      .where("_id")
      .in(products.map((product) => product.productId))
      .exec();

    if (productsFound.length !== products.length) {
      return res
        .status(400)
        .json({ success: false, message: "Some products not found" });
    }

    const dataInsert = {
      products: products.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        productPrice: item.productPrice,
      })),
      recipientInformation,
      totalPrice,
      userId,
      createdAt: new Date(),
      orderNumber: generateRandomNumber(),
    };

    await Order.create(dataInsert);
    await Cart.findOneAndDelete({
      userId,
    });

    res.json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
});

module.exports = router;
