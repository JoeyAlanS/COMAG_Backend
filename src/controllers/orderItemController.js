const OrderItem = require("../models/orderItemModel");

exports.getAllOrderItems = (req, res) => {
    OrderItem.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };  

exports.getItemsByOrderId = (req, res) => {
  OrderItem.getByOrderId(req.params.orderId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createOrderItem = (req, res) => {
  OrderItem.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Item do pedido criado com sucesso" });
  });
};
