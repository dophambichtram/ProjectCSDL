const Product = require("../../models/Product");
const Order = require("../../models/Order");

class ProductService {
  static async createProduct(data) {
    const insertData = {
      price: data.price,
      product_type: data.product_type,
      brands: data.brands,
      product_name: data.product_name,
      images: data.images,
      variants: data.variants,
      tab_data: data.tab_data,
    };

    const newProduct = new Product(insertData);
    return await newProduct.save();
  }

  static async deleteProduct(productId) {
    const order = await Order.findOne({ "products.id": productId });
    if (order) {
      throw new Error("This product is in the order, so it cannot be deleted");
    }
    await Product.findByIdAndDelete(productId);
  }

  static async getAllProduct(query) {
    const { q } = query;
    const filter = {};

    if (q) {
      const regexPattern = new RegExp(`.*${q}.*`, "i");
      filter.product_name = { $regex: regexPattern };
    }

    return await Product.find(filter).lean();
  }
}

module.exports = ProductService;
