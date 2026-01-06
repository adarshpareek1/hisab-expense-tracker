const CategorySummary = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 font-semibold">Category Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <span className="text-xl">🛍️</span>
          <div>
            <p className="font-medium">Shopping</p>
            <p className="text-sm text-[var(--light-text)]">
              ₹1,000 (66.7%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <span className="text-xl">🍔</span>
          <div>
            <p className="font-medium">Food & Dining</p>
            <p className="text-sm text-[var(--light-text)]">
              ₹500 (33.3%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySummary;
