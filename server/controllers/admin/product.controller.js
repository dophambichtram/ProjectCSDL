const ProductAdminService = require("../../services/admin/product.service");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const query = req.query;
      const products = await ProductAdminService.getAllProduct(query);
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req, res) {
    try {
      const product = await ProductAdminService.createProduct(req.body);
      return res.status(201).json({ message: "Successfully", product });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res) {
    const productId = req.params.productId;
    try {
      await ProductAdminService.deleteProduct(productId);
      res.status(204).json({ data: 1 });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProductController;
