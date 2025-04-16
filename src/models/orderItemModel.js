const db = require("../config/db");

const OrderItem = {
    getAll: (callback) => {
        db.query("SELECT * FROM order_items", callback);
    },

    getByOrderId: (orderId, callback) => {
        db.query("SELECT * FROM order_items WHERE order_id = ?", [orderId], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO order_items SET ?", data, callback);
    },

    deleteByOrderId: (orderId, callback) => {
        db.query("DELETE FROM order_items WHERE order_id = ?", [orderId], callback);
    }
};

module.exports = OrderItem;
