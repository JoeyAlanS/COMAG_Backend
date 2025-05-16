const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

router.get("/", budgetController.getAllBudgets);
router.get("/:id", budgetController.getBudgetById);
router.post("/", budgetController.createBudget);
router.delete("/:id", budgetController.deleteBudget);

module.exports = router;