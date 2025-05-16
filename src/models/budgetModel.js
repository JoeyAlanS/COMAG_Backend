const mongoose = require("../config/db");
const Counter = require("./counterModel");

const budgetSchema = new mongoose.Schema({
  customId: { type: Number, unique: true },
  nome: { type: String, required: true },
  email: { type: String, required: true }, 
  telefone: { type: String, required: true },
  nomeEmpresa: { type: String, required: true },
  sedeEmpresa: { type: String, required: true },
  equipamento: { type: String, required: true },
  data: { type: Date, required: true }
});

budgetSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "budgetId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.customId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Budget", budgetSchema);