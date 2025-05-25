const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "cart_tbl" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user_tbl" },
    adress: { type: String },
    payment: { type: String },
    totalAmount: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("order_tbl", orderSchema);

module.exports = Order;
