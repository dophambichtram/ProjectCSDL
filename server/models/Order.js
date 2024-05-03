const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
      productPrice: Number,
    },
  ],
  recipientInformation: { type: Object },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("orders", orderSchema);
