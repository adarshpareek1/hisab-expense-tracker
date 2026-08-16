import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

export const getAnalytics = async (req, res) => {
  const { month } = req.query;

  // 1. Fetch the budget normally
  const budget = await Budget.findOne({ user: req.userId, month });

  // 2. Use MongoDB Aggregation Pipeline to do the heavy math
  const categoryTotals = await Expense.aggregate([
    { 
      $match: { 
        user: new mongoose.Types.ObjectId(req.userId), 
        month: month 
      } 
    },
    { 
      $group: { 
        _id: "$category", 
        total: { $sum: "$amount" } 
      } 
    }
  ]);

  // 3. Format the data for the React frontend
  let totalSpent = 0;
  const byCategory = {};
  
  categoryTotals.forEach((item) => {
    byCategory[item._id] = item.total;
    totalSpent += item.total;
  });

  res.json({
    totalSpent,
    byCategory,
    budget: budget?.amount || 0,
  });
};
