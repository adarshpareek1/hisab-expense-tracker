import { useState, useEffect } from "react";
import { Target, Edit, Pencil } from 'lucide-react';

const BudgetTracker = ({ budget, totalSpent, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(budget?.amount || "");

  // Update local state if the budget prop changes externally
  useEffect(() => {
    setAmount(budget?.amount || "");
  }, [budget]);

  const total = budget?.amount || 0;
  const percent = total ? Math.min((totalSpent / total) * 100, 100) : 0;

  const handleSave = () => {
    onSave(Number(amount));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setAmount(budget?.amount || ""); // Reset amount on cancel
  };

  const budgetForm = (
    <div className="mt-4">
      <h4 className="mb-2 font-semibold">Set Monthly Budget</h4>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)]"
        placeholder="Enter budget amount"
      />
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="rounded-xl bg-[var(--primary)] px-4 py-2 text-white transition hover:opacity-90"
        >
          Update Budget
        </button>
        <button
          onClick={handleCancel}
          className="rounded-xl bg-gray-100 px-4 py-2 text-gray-600 transition hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  if (!budget) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="mb-4 flex items-center gap-2 font-bold">
          <Target className="h-6 w-6 text-[var(--primary)]" /> Budget Tracker
        </h3>

        {editing ? (
          budgetForm
        ) : (
          <>
            <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
              Budget not set for this month.
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 w-full rounded-xl bg-[var(--primary)] py-2 text-white transition hover:opacity-90"
            >
              Set Budget
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-lg">
          <Target className="h-6 w-6 text-[var(--primary)]" /> Budget Tracker
        </h3>
        <button
          onClick={() => setEditing(!editing)}
          className="rounded-lg transition hover:bg-gray-200 p-2"
        >
          <Pencil className="h-5 w-5" />
        </button>
      </div>

      {percent > 80 && (
        <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          ⚠️ You have used more than 80% of your budget!
        </div>
      )}

      <div className="mb-2 flex justify-between text-sm">
        <span>Budget Used</span>
        <span className="font-medium">{percent.toFixed(1)}%</span>
      </div>

      <div className="mb-6 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-[var(--primary)] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-[var(--light-text)]">Spent</p>
          <p className="text-xl font-bold">₹{totalSpent}</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-[var(--light-text)]">Left</p>
          <p className="text-xl font-bold text-green-600">
            ₹{Math.max(total - totalSpent, 0)}
          </p>
        </div>
      </div>

      {editing && budgetForm}
    </div>
  );
};

export default BudgetTracker;