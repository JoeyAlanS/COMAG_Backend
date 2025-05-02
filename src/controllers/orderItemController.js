const OrderItem = require("../models/orderItemModel");

exports.getAllOrderItems = (req, res) => {
  OrderItem.getAll((err, results) => {
    if (err) return res.status(500).json({ error: `Erro ao buscar itens do pedido: ${err.message}` });
    res.json(results);
  });
};

exports.getItemsByOrderId = (req, res) => {
  OrderItem.getByOrderId(req.params.orderId, (err, results) => {
    if (err) return res.status(500).json({ error: `Erro ao buscar itens para o pedido ID ${req.params.orderId}: ${err.message}` });
    res.json(results);
  });
};

exports.createOrderItem = (req, res) => {
  OrderItem.create(req.body, (err) => {
    if (err) {
      if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).json({ 
          error: `Valor inválido fornecido: ${JSON.stringify(req.body)}` 
        });
      }
      return res.status(500).json({ error: `Erro ao criar item do pedido: ${err.message}` });
    }
    res.status(201).json({ message: "Item do pedido criado com sucesso" });
  });
};
