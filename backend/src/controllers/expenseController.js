import Expense from "../models/Expense.js";

// ADD (already exists)
export const addExpense = async (req, res) => {
  const { amount, category, note, date, month } = req.body;

  const expense = await Expense.create({
    user: req.userId,
    amount,
    category,
    note,
    date,
    month,
  });

  res.json(expense);
};

// GET (already exists)
export const getExpenses = async (req, res) => {
  const { month } = req.query;

  const expenses = await Expense.find({
    user: req.userId,
    month,
  }).sort({ date: -1 });

  res.json(expenses);
};

// ✏️ UPDATE EXPENSE
export const updateExpense = async (req, res) => {
  const expense = await Expense.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  expense.amount = req.body.amount;
  expense.category = req.body.category;
  expense.note = req.body.note;
  expense.date = req.body.date;

  await expense.save();
  res.json(expense);
};

// 🗑️ DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json({ message: "Expense deleted" });
};
