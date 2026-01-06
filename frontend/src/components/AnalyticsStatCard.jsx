const AnalyticsStatCard = ({ title, value, icon, sub }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-6">
      <div>
        <p className="text-sm text-[var(--light-text)]">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
        {sub && (
          <p className="mt-1 text-sm text-[var(--light-text)]">{sub}</p>
        )}
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        {icon}
      </div>
    </div>
  );
};

export default AnalyticsStatCard;
