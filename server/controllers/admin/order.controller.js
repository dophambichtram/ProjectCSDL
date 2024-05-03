const OrderAdminService = require("../../services/admin/order.service");

class OrderController {
  static async getAllOrder(req, res, next) {
    try {
      const query = req.query;
      const orders = await OrderAdminService.getAllOrder(query);
      res.status(200).json({ orders });
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res) {
    const orderId = req.params.orderId;
    try {
      await OrderAdminService.deleteOrder(orderId);
      res.status(204).json({ data: 1 });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
