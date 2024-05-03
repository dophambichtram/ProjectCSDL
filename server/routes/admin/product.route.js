const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/admin/product.controller");

router.get("/", ProductController.getAllProduct);
router.post("/", ProductController.createProduct);
router.delete("/:productId", ProductController.deleteProduct);

module.exports = router;
