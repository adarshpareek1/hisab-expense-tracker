import {
  LineChart as LChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { useEffect, useState } from "react";
import { TrendingUp } from 'lucide-react';
import { fetchExpenses } from "../services/expenseService";

const LineChart = ({ month }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExpenses(month).then((expenses) => {
      const [yearStr, monthStr] = month.split("-");
      const year = parseInt(yearStr);
      const monthIndex = parseInt(monthStr) - 1;
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

      const dailyMap = {};
      for (let i = 1; i <= daysInMonth; i++) {
        dailyMap[i] = 0;
      }

      expenses.forEach((e) => {
        const d = new Date(e.date);
        if (d.getMonth() === monthIndex && d.getFullYear() === year) {
          const day = d.getDate();
          dailyMap[day] += e.amount;
        }
      });

      const chartData = Object.entries(dailyMap).map(([day, value]) => ({
        day: `Jan ${day}`, // Consider making the month name dynamic
        value,
      }));

      setData(chartData);
    });
  }, [month]);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 font-semibold text-gray-800">
        {/* Icon: Bigger and Primary Color */}
        <TrendingUp className="h-6 w-6 text-[var(--primary)]" /> Daily Spending Trend
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              // Tick: Darker Color
              tick={{ fill: '#374151', fontSize: 12 }}
              interval={1}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              // Tick: Darker Color
              tick={{ fill: '#374151', fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`₹${value}`, "Spent"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0f766e"
              strokeWidth={2}
              dot={{ fill: '#0f766e', strokeWidth: 2, r: 4, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;