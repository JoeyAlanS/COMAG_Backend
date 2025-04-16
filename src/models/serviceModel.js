const db = require("../config/db");

const Service = {
  getAll: (callback) => {
    db.query("SELECT * FROM services", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM services WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query("INSERT INTO services SET ?", data, callback);
  },

  update: (id, data, callback) => {
    db.query("UPDATE services SET ? WHERE id = ?", [data, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM services WHERE id = ?", [id], callback);
  },
};

module.exports = Service;
