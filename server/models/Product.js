const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  //   productUrl: {
  //     type: String,
  //     required: false,
  //   },
  //   product_id: {
  //     type: String,
  //     required: false,
  //     // index: true,
  //   },
  product_name: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: false,
      maxlength: 2000,
    },
  ],
  brands: {
    type: String,
    required: true,
  },
  variants: [
    {
      type: String,
      required: false,
      maxlength: 2000,
    },
  ],
  tab_data: {
    type: Object,
  },
});

module.exports = mongoose.model("Product", productSchema);
