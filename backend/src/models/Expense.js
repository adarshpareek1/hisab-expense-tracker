import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    category: String,
    note: String,
    date: Date,
    month: String, // YYYY-MM
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
