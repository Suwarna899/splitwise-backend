const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  groupId: String,
  paidBy: String,
  amount: Number,
  splitBetween: [String],
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
