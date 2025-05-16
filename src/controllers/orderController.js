const mongoose = require("mongoose");
const Order = require("../models/orderModel");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders.map(o => ({
      id: o.customId,
      userId: o.user_id,
      total: o.total,
      status: o.status,
      created_at: o.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar pedidos: ${err.message}` });
  }
};

exports.getOrderById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const order = await Order.findOne({ customId: id });
    if (!order) return res.status(404).json({ error: "Pedido não encontrado." });
    res.json({
      id: order.customId,
      userId: order.user_id,
      total: order.total,
      status: order.status,
      created_at: order.created_at
    });
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar pedido: ${err.message}` });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Pedido criado com sucesso", orderId: order.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao criar pedido: ${err.message}` });
  }
};
