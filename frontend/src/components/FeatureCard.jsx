const FeatureCard = ({ icon, title, description, highlighted = false }) => {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition
        ${
          highlighted
            ? "border-[var(--primary)] shadow-lg"
            : "border-gray-200 shadow-sm hover:shadow-md"
        }
      `}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl
          ${
            highlighted
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--primary-light)] text-[var(--primary)]"
          }
        `}
      >
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-[var(--dark-text)]">
        {title}
      </h3>

      <p className="text-md leading-relaxed text-[var(--light-text)]">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
