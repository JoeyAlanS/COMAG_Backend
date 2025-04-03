require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/products");
const serviceRoutes = require("./routes/services");

const app = express();

app.use(express.json());
app.use(cors()); // Permitir requisições de outros domínios

// Definição das rotas
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
