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

  const avgDaily =
    data.totalSpent / new Date().getDate();

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
      </main>
    </div>
  );
};

export default Analytics;
