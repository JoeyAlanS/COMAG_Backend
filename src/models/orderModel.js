const mongoose = require("../config/db");
const Counter = require("./counterModel");

const orderSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
  created_at: { type: Date, default: Date.now }
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
