const Order = require("../../models/Order");

class OrderService {
  static async getAllOrder(query) {
    const { q } = query;
    const filter = {};

    if (q) {
      const regexPattern = new RegExp(`.*${q}.*`, "i");
      filter.orderNumber = { $regex: regexPattern };
    }

    const orders = await Order.find(filter).lean();
    return orders;
  }

  static async deleteOrder(orderId) {
    await Order.findByIdAndDelete(orderId);
  }
}

module.exports = OrderService;
