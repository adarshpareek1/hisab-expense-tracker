import { Link } from "react-router-dom";
import { Wallet, ArrowLeft } from 'lucide-react';

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-light)] to-white px-4 py-10">
      
      {/* Wrapper to align the Back button with the Card */}
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-[var(--primary)] hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Wallet className="h-10 w-10 text-[var(--primary)]" />
          <span className="text-3xl font-bold text-[var(--primary)]">Hisab</span>
        </div>

        <h1 className="text-center text-2xl font-bold text-[var(--dark-text)]">
          {title}
        </h1>

        <p className="mt-2 text-center text-sm text-[var(--light-text)]">
          {subtitle}
        </p>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;