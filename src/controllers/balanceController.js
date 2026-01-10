const Expense = require("../models/Expense");

// Get summary for a specific group
const getGroupSummary = async (req, res) => {
  const { groupId } = req.params;

  try {
    const expenses = await Expense.find({ groupId }); // fetch from MongoDB

    if (expenses.length === 0)
      return res.json({ message: "No expenses in this group" });

    const summary = {}; // { username: net balance }

    expenses.forEach(exp => {
      const share = exp.amount / exp.splitBetween.length;

      exp.splitBetween.forEach(user => {
        if (!summary[user]) summary[user] = 0;

        if (user === exp.paidBy) {
          summary[user] += exp.amount - share; // paid minus their own share
        } else {
          summary[user] -= share; // owes money
        }
      });
    });

    res.json(summary);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get balances across all users/groups
const getBalances = async (req, res) => {
  try {
    const expenses = await Expense.find(); // fetch all expenses from MongoDB
    const balances = {};

    expenses.forEach(exp => {
      const perPerson = exp.amount / exp.splitBetween.length;

      exp.splitBetween.forEach(user => {
        if (user !== exp.paidBy) {
          if (!balances[user]) balances[user] = {};
          if (!balances[user][exp.paidBy]) balances[user][exp.paidBy] = 0;
          balances[user][exp.paidBy] += perPerson;
        }
      });
    });

    res.json(balances);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getGroupSummary, getBalances };
