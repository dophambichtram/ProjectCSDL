const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  fullName: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

userSchema.methods.generateFourDigitToken = function () {
  const token = Math.floor(1000 + Math.random() * 9000);
  this.resetToken = token.toString();
  this.resetTokenExpiryDate = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 phút hết hạn
  return this.resetToken;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
