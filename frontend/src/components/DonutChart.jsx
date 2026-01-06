import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = ["#a855f7", "#f97316", "#22c55e", "#0ea5e9"];

const DonutChart = ({ data }) => {
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
    const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]} // Match category color
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={14}    
        fontWeight="600" 
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const index = data.findIndex((item) => item.name === name);
      const color = COLORS[index % COLORS.length];

      return (
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <p style={{ color: color }} className="text-sm font-bold">
            {name}
          </p>
          <p className="text-sm font-medium text-gray-600">
            ₹{value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 font-semibold text-gray-800">
        <PieIcon className="h-6 w-6 text-[var(--primary)]" /> Spending by Category
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70} 
              outerRadius={110} 
              paddingAngle={5}
              label={renderCustomizedLabel}
              labelLine={true} 
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutChart;