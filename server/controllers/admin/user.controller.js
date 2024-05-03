const UserAdminService = require("../../services/admin/user.service");

class UserController {
  static async getListUser(req, res) {
    try {
      const query = req.query;
      const users = await UserAdminService.getListUser(query);
      return res.status(200).json({ users });
    } catch (error) {
      res.json(500).json({ message: "Something error" });
    }
  }

  static async updateUser(req, res) {
    const data = {
      ...req.body,
      userId: req.params.userId,
    };
    try {
      await UserAdminService.updateUser(data);
    } catch (error) {
      res.json(500).json({ message: "Something error" });
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.userId;
    try {
      await UserAdminService.deleteUser(userId);
      res.status(204).json({ data: 1 });
    } catch (error) {
      res.json(500).json({ message: "Something error" });
    }
  }
}

module.exports = UserController;
