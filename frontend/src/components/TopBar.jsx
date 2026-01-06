import { Calendar, ChevronDown } from 'lucide-react';

const TopBar = ({ month, setMonth }) => {
  // generate last 12 months
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const formatMonth = (month) => {
    const [year, m] = month.split("-");
    return new Date(year, m - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-[var(--light-text)]">
          Track and manage your expenses
        </p>
      </div>

      <div className="relative">
        {/* Left Icon (Calendar) */}
        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

        {/* The Select Input */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm font-medium text-gray-700 outline-none transition-all hover:border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 cursor-pointer"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {formatMonth(m)}
            </option>
          ))}
        </select>

        {/* Right Icon (Chevron) - pointer-events-none ensures clicks pass through to the select */}
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
};

export default TopBar;
