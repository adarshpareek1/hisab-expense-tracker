import { useState } from "react";
import { updateExpense, deleteExpense } from "../services/expenseService";
import { Pencil, Trash2, Search, X } from 'lucide-react';

const ExpenseList = ({ expenses, onRefresh }) => {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const filtered = expenses.filter(
    (e) =>
      e.note?.toLowerCase().includes(query.toLowerCase()) ||
      e.date.includes(query)
  );

  const startEdit = (e) => {
    setEditingId(e._id);
    setForm({
      amount: e.amount,
      category: e.category,
      note: e.note || "",
      date: e.date.slice(0, 10),
    });
  };

  const saveEdit = async (id) => {
    await updateExpense(id, form);
    setEditingId(null);
    onRefresh();
  };

  const remove = async (id) => {
    if (!confirm("Delete this expense?")) return;
    await deleteExpense(id);
    onRefresh();
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h3 className="text-xl font-bold text-gray-800">Expenses</h3>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search by note or date..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <p>No expenses found matching your search.</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((e) => (
          <div
            key={e._id}
            className={`rounded-2xl bg-gray-50 p-4 transition-all hover:bg-gray-100 ${editingId === e._id ? 'border border-[var(--primary)] bg-white ring-2 ring-[var(--primary)]/10' : ''}`}
          >
            {editingId === e._id ? (
              // EDIT MODE
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Amount</label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(ev) => setForm({ ...form, amount: ev.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(ev) => setForm({ ...form, category: ev.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(ev) => setForm({ ...form, date: ev.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                    />
                   </div>
                   <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500">Note</label>
                    <input
                      type="text"
                      value={form.note}
                      onChange={(ev) => setForm({ ...form, note: ev.target.value })}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                    />
                   </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEdit(e._id)}
                    className="flex items-center gap-1 rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{e.amount}
                    </span>
                    <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                      {e.category}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(e.date)}</span>
                    <span>•</span>
                    <span className="truncate">{e.note || "No description"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 self-end sm:self-center">
                  <button 
                    onClick={() => startEdit(e)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white hover:text-[var(--primary)] hover:shadow-sm"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => remove(e._id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white hover:text-red-500 hover:shadow-sm"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;