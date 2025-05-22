const mongoose = require("../config/db");
const Counter = require("./counterModel");

const productSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  created_at: { type: Date, default: Date.now },
  image:{type: String, unique:true}
});

productSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
