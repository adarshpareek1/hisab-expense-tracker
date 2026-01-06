import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

export const getAnalytics = async (req, res) => {
  const { month } = req.query;

  const expenses = await Expense.find({ user: req.userId, month });
  const budget = await Budget.findOne({ user: req.userId, month });

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = {};
  expenses.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });

  res.json({
    totalSpent: total,
    byCategory,
    budget: budget?.amount || 0,
  });
};
