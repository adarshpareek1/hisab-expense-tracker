import { useState } from "react";
import { Plus } from 'lucide-react';

const AddExpenseForm = ({ onAdd }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const expense = {
      amount: Number(e.target.amount.value),
      category: e.target.category.value,
      date: e.target.date.value,
      note: e.target.note.value,
    };

    await onAdd(expense); 
    e.target.reset();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
        <Plus className="h-5 w-5 text-[var(--primary)]" /> Add Expense
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Amount (₹)</label>
            <input
              name="amount"
              type="number"
              required
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
            <select
              name="category"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] bg-white"
            >
              <option value="">Select</option>
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Utilities</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Date</label>
          <input
            name="date"
            type="date"
            required
            defaultValue={new Date().toISOString().split('T')[0]} // Defaults to today
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Note (optional)</label>
          <textarea
            name="note"
            rows="2"
            placeholder="What was this for?"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[var(--primary)] py-3 font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;