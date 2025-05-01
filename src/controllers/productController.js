const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  const { category } = req.query;

  if (category) {
    Product.getByCategory(category, (err, results) => {
      if (err) return res.status(500).json({ error: `Erro ao buscar produtos da categoria '${category}': ${err.message}` });
      if (!results || results.length === 0) {
        return res.status(404).json({ error: `Nenhum produto encontrado na categoria '${category}'.` });
      }
      res.json(results);
    });
  } else {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: `Erro ao buscar produtos: ${err.message}` });
      res.json(results);
    });
  }
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: `Erro ao buscar produto com ID ${req.params.id}: ${err.message}` });
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: `Produto com ID ${req.params.id} não encontrado.` });
    }
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  Product.create(req.body, (err) => {
    if (err) {
      if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).json({ 
          error: `O valor fornecido para o 'price' é inválido: ${req.body.price}. Inteiro esperado.` 
        });
      }
      return res.status(500).json({ error: `Erro ao criar produto: ${err.message}` });
    }
    res.status(201).json({ message: "Produto criado com sucesso" });
  });
};

exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) {
      if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
        return res.status(400).json({ 
          error: `O valor fornecido para o 'price' é inválido: ${req.body.price}. Inteiro esperado.` 
        });
      }
      return res.status(500).json({ error: `Erro ao atualizar produto com ID ${req.params.id}: ${err.message}` });
    }
    res.json({ message: "Produto atualizado com sucesso" });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: `Erro ao remover produto com ID ${req.params.id}: ${err.message}` });
    res.json({ message: "Produto removido com sucesso" });
  });
};
