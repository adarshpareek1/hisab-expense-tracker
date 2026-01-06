import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/Topbar";
import StatCard from "../components/StatCard";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import BudgetTracker from "../components/BudgetTracker";

import { fetchExpenses, addExpense } from "../services/expenseService";
import { getBudget, setBudget } from "../services/budgetService";
import { getAnalytics } from "../services/analyticsService";
import { getCurrentMonth } from "../utils/month";

const Dashboard = () => {
  const [month, setMonth] = useState(getCurrentMonth());

  const [expenses, setExpenses] = useState([]);
  const [budget, setBudgetState] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true);

      const [expenseData, budgetData, analyticsData] = await Promise.all([
        fetchExpenses(month),
        getBudget(month),
        getAnalytics(month),
      ]);

      setExpenses(expenseData);
      setBudgetState(budgetData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData(true); 
  }, [month]);

  const handleAddExpense = async (expense) => {
    await addExpense({ ...expense, month });
    loadDashboardData(false); 
  };

  const handleSetBudget = async (amount) => {
    await setBudget({ month, amount });
    loadDashboardData(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--primary)] font-medium">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50 p-8">
        <TopBar month={month} setMonth={setMonth} />

        <StatCard
          totalSpent={analytics?.totalSpent || 0}
          expenseCount={expenses.length}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddExpenseForm onAdd={handleAddExpense} />

          <div className="col-span-1 md:col-span-2 space-y-6">
            <ExpenseList 
              expenses={expenses} 
              onRefresh={() => loadDashboardData(false)} // Pass false here too
            />
            <BudgetTracker
              budget={budget}
              totalSpent={analytics?.totalSpent || 0}
              onSave={handleSetBudget}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;