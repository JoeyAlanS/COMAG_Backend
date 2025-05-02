const Order = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) return res.status(500).json({ error: `Erro ao buscar pedidos: ${err.message}` });
    res.json(results);
  });
};

exports.getOrderById = (req, res) => {
  Order.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao buscar pedido com ID ${req.params.id}: ${err.message}` });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: `Pedido com ID ${req.params.id} não encontrado.` });
    }
    res.json(result[0]);
  });
};

exports.createOrder = (req, res) => {
  Order.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao criar pedido: ${err.message}` });
    }
    res.status(201).json({ message: "Pedido criado com sucesso", orderId: result.insertId });
  });
};
