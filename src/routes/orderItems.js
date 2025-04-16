const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

router.get("/", orderItemController.getAllOrderItems);
router.get("/:orderId", orderItemController.getItemsByOrderId);
router.post("/", orderItemController.createOrderItem);

module.exports = router;
