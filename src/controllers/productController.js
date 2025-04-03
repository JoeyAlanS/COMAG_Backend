const db = require("../config/db");

exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  db.query("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Produto criado com sucesso" });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto atualizado com sucesso" });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto removido com sucesso" });
  });
};
