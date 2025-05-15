const mongoose = require("../config/db");
const Counter = require("./counterModel");

const orderItemSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", default: null },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

orderItemSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderItemId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
