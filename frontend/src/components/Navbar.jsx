import { Link } from "react-router-dom";
import { Wallet } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold text-[var(--primary)]"
        >
          <Wallet size={36} className="text-[var(--primary)]" /> Hisab
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-[var(--dark-text)] transition hover:text-[var(--primary)]"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
