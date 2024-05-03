const User = require("../../models/User");

class UserService {
  static async getListUser(query) {
    const { q } = query;
    const filter = { role: { $ne: "ADMIN" } };

    if (q) {
      const regexPattern = new RegExp(`.*${q}.*`, "i");
      filter.fullName = { $regex: regexPattern };
    }

    const users = await User.find(filter)
      .select(["_id", "fullName", "email"])
      .lean();
    return users;
  }

  static async updateUser(data) {
    const { role, userId } = data.role;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      {
        new: true,
      }
    );
  }

  static async deleteUser(userId) {
    await User.findByIdAndDelete(userId);
  }
}

module.exports = UserService;
