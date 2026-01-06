import Budget from "../models/Budget.js";

export const setBudget = async (req, res) => {
  const { month, amount } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: req.userId, month },
    { amount },
    { upsert: true, new: true }
  );

  res.json(budget);
};

export const getBudget = async (req, res) => {
  const { month } = req.query;

  const budget = await Budget.findOne({
    user: req.userId,
    month,
  });

  res.json(budget);
};
