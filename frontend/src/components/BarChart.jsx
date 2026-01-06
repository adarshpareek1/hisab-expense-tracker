import {
  BarChart as BChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { BarChart3 } from 'lucide-react';

const BarChart = ({ data }) => {
  const colors = ["#a855f7", "#f97316", "#22c55e", "#0ea5e9"];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      // Find the index of the current item to match the bar color
      const index = data.findIndex(item => item.name === name);
      const color = colors[index % colors.length];

      return (
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <p className="mb-1 text-sm font-medium text-gray-900">{name}</p>
          <p style={{ color: color }} className="text-sm font-bold">
            Spent: ₹{value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 font-semibold text-gray-800">
        <BarChart3 className="h-6 w-6 text-[var(--primary)]" /> Category Breakdown
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            
            <XAxis 
              type="number" 
              axisLine={true} 
              tickLine={true} 
              tick={{ fill: '#374151', fontSize: 12 }} 
              tickFormatter={(value) => `₹${value}`} // Adds Rupee symbol to X-axis values
            />
            
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={true} 
              tickLine={false}
              width={100}
              tick={{ fill: '#374151', fontSize: 14, fontWeight: 500 }}
            />
            
            {/* Pass the CustomTooltip component here */}
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'transparent' }} 
            />
            
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;