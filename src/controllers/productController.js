const mongoose = require("mongoose");
const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products.map(p => ({
      id: p.customId,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      created_at: p.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar produtos: ${err.message}` });
  }
};

exports.getProductById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const product = await Product.findOne({ customId: id });
    if (!product) return res.status(404).json({ error: "Produto não encontrado." });
    res.json({
      id: product.customId,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      created_at: product.created_at
    });
  } catch (err) {
    res.status(500).json({ error: `Erro ao buscar produto: ${err.message}` });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category, description } = req.body;

  // Validação extra para campos obrigatórios
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "O campo 'name' é obrigatório e não pode ser vazio." });
  }
  if (price === undefined || price === null || price === "" || isNaN(Number(price))) {
    return res.status(400).json({ error: "O campo 'price' é obrigatório e deve ser um número." });
  }
  if (!category || typeof category !== "string" || category.trim() === "") {
    return res.status(400).json({ error: "O campo 'category' é obrigatório e não pode ser vazio." });
  }
  if (!description || typeof description !== "string" || description.trim() === "") {
    return res.status(400).json({ error: "O campo 'description' é obrigatório e não pode ser vazio." });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Produto criado com sucesso", id: product.customId });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao criar produto: ${err.message}` });
  }
};

exports.updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const product = await Product.findOneAndUpdate({ customId: id }, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message).join("; ");
      return res.status(400).json({ error: `Erro de validação: ${messages}` });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: `Tipo de dado inválido para o campo "${err.path}".` });
    }
    res.status(500).json({ error: `Erro ao atualizar produto: ${err.message}` });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido." });
  }
  try {
    const product = await Product.findOneAndDelete({ customId: id });
    if (!product) return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto removido com sucesso" });
  } catch (err) {
    res.status(500).json({ error: `Erro ao remover produto: ${err.message}` });
  }
};
