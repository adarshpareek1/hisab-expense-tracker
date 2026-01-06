import {CreditCard} from 'lucide-react'

const StatCard = ({ totalSpent, expenseCount }) => {
  return (
    <div className="mb-8 rounded-3xl bg-gradient-to-r from-[var(--primary)] to-[#2f8f82] p-8 text-white">
      <p className="mb-2 flex items-center gap-2 text-sm opacity-90">
        <CreditCard className="text-white-100" /> Total Spent This Month
      </p>

      <h2 className="text-4xl font-bold">₹{totalSpent}</h2>

      <p className="mt-2 text-sm opacity-80">
        {expenseCount} expense{expenseCount !== 1 && "s"} recorded
      </p>
    </div>
  );
};

export default StatCard;
