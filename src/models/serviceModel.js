const mongoose = require("../config/db");
const Counter = require("./counterModel");

const serviceSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  name: { type: String, required: true },
  description: String,
  price: Number,
  created_at: { type: Date, default: Date.now }
});

serviceSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "serviceId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Service", serviceSchema);
