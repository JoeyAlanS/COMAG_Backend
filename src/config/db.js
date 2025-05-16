const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/comag_db";

mongoose.connect(MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Erro ao conectar no MongoDB:", err);
});

db.once("open", () => {
  console.log("Conectado ao MongoDB com sucesso!");
});

module.exports = mongoose;