const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  Product.create(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Produto criado com sucesso" });
  });
};

exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto atualizado com sucesso" });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto removido com sucesso" });
  });
};
