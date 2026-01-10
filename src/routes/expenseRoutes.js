console.log("🔥 Expense router loaded");
const express = require("express");
const router = express.Router();
const { addExpense, listExpenses, deleteExpense } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/list/:groupId", authMiddleware, listExpenses); 
router.post("/add", authMiddleware, addExpense);
router.delete("/delete/:id", authMiddleware, deleteExpense);

router.get("/test", (req, res) => {
    res.send("Expense route works");
});

module.exports = router;