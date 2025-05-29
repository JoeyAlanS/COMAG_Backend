require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const serviceRoutes = require("./routes/services");
const orderItemRoutes = require("./routes/orderItems");
const budgetRoutes = require("./routes/budgets");
const authRoutes = require("./routes/auth");
const authenticateToken = require("./middleware/auth");


const app = express();

app.use(express.json());
app.use(cors()); // Permitir requisições de outros domínios

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Definição das rotas
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/order-items", orderItemRoutes)
app.use("/api/budgets", budgetRoutes)
app.use("/api/auth", authRoutes);

// Exemplo de rota protegida
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acesso autorizado!", user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
