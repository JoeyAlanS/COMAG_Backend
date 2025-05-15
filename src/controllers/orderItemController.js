const mongoose = require("mongoose");
const OrderItem = require("../models/orderItemModel");

exports.getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find();
    res.json(items.map(i => ({
      id: i.customId,
      orderId: i.order_id,
      productId: i.product_id,
      serviceId: i.service_id,
      quantity: i.quantity,
      price: i.price
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar itens do pedido: ${err.message}` });
  }
};

exports.getItemsByOrderId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
    return res.status(400).json({ error: "ID de pedido inválido." });
  }
  try {
    const items = await OrderItem.find({ order_id: req.params.orderId });
    res.json(items.map(i => ({
      id: i.customId,
      orderId: i.order_id,
      productId: i.product_id,
      serviceId: i.service_id,
      quantity: i.quantity,
      price: i.price
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar itens para o pedido: ${err.message}` });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const item = new OrderItem(req.body);
    await item.save();
    res.status(201).json({ message: "Item do pedido criado com sucesso", id: item.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao criar item do pedido: ${err.message}` });
  }
};
