const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// Logic for adding an expense (UPDATED to support selected payers)
const addExpense = async (req, res) => {
  try {
    // Destructure paidBy from req.body (sent by the dropdown in Expenses.js)
    const { groupId, amount, description, paidBy } = req.body;
    
    // Use the selected payer if provided; otherwise, fall back to the logged-in user
    const actualPayer = paidBy || req.user.username; 

    if (!groupId || !amount || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newExpense = new Expense({
      groupId: new mongoose.Types.ObjectId(groupId),
      amount: Number(amount),
      description,
      paidBy: actualPayer, // Use the actual payer here
      date: new Date()
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Save Error: " + err.message });
  }
};

// Logic for listing expenses (Filtered by Group)
const listExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid Group ID format" });
    }

    const expenses = await Expense.find({ groupId: new mongoose.Types.ObjectId(groupId) })
                                 .sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Fetch Error: " + err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addExpense, listExpenses, deleteExpense };