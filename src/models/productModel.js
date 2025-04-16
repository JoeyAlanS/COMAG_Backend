const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO products SET ?", data, callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE products SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
  },
};

module.exports = Product;
