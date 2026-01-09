import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AnalyticsStatCard from "../components/AnalyticsStatCard";
import { getAnalytics } from "../services/analyticsService";
import { getCurrentMonth } from "../utils/month";

import DonutChart from "../components/DonutChart";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { IndianRupee, TrendingUp, PieChart, Calendar, ChevronDown } from "lucide-react";

const Analytics = () => {
  const [month, setMonth] = useState(getCurrentMonth());
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics(month).then(setData);
  }, [month]);

  if (!data) return null;

  const categoryData = Object.entries(data.byCategory).map(
    ([name, value]) => ({ name, value })
  );

  const avgDaily = data.totalSpent / new Date().getDate();

  const formatMonth = (month) => {
    const [year, m] = month.split("-");
    return new Date(year, m - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-[var(--light-text)]">
              Insights into your spending patterns
            </p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm font-medium text-gray-700 outline-none transition-all hover:border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 cursor-pointer"
            >
              {[...Array(12)].map((_, i) => {
                const d = new Date();
                d.setMonth(d.getMonth() - i);
                const m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                return (
                  <option key={m} value={m}>
                    {formatMonth(m)}
                  </option>
                );
              })}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* KPIs */}
        {data.totalSpent === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mb-4 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <h2 className="text-xl font-semibold">No Expenses Yet</h2>
            <p>Start adding transactions to see your analytics here.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-4 gap-6">
              <AnalyticsStatCard
                title="Total Spent"
                value={`₹${data.totalSpent}`}
                icon={<IndianRupee className="text-[var(--primary)]" />}
              />
              <AnalyticsStatCard
                title="Avg Daily Spend"
                value={`₹${avgDaily.toFixed(0)}`}
                icon={<Calendar className="text-[var(--primary)]" />}
              />
              <AnalyticsStatCard
                title="Top Category"
                value={categoryData[0]?.name || "—"}
                icon={<TrendingUp className="text-[var(--primary)]" />}
              />
              <AnalyticsStatCard
                title="Budget Used"
                value={
                  data.budget
                    ? `${((data.totalSpent / data.budget) * 100).toFixed(1)}%`
                    : "—"
                }
                icon={<PieChart className="text-[var(--primary)]" />}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              <DonutChart data={categoryData} />
              <BarChart data={categoryData} />
            </div>

            <div className="mt-8">
              <LineChart month={month} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Analytics;
