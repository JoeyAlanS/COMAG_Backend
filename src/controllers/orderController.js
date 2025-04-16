const Order = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getOrderById = (req, res) => {
  Order.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.createOrder = (req, res) => {
  Order.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Pedido criado com sucesso", orderId: result.insertId });
  });
};
