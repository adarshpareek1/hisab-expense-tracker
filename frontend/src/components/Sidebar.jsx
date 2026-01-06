import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Wallet, LayoutDashboard, TrendingUp, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const path = location.pathname;

  // Helper to get button styles based on active state
  const getButtonClass = (route) =>
    path === route
      ? "flex w-full items-center gap-3 rounded-xl bg-[var(--primary)] px-4 py-3 text-white shadow-md transition-all"
      : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900";

  // Helper to get icon styles based on active state
  const getIconClass = (route) =>
    path === route ? "text-white" : "text-[var(--primary)]";

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white p-6 sticky top-0">
      <div className="mb-10 flex items-center gap-2 text-3xl font-bold text-[var(--primary)]">
        <Wallet size={32} className="text-[var(--primary)]" />
        <span className="tracking-tight">Hisab</span>
      </div>

      <div className="mb-6 rounded-xl bg-[var(--primary)]/10 p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Welcome back
        </p>
        <p className="mt-1 text-lg font-bold text-gray-800">
          {user?.username || "User"}
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className={getButtonClass("/dashboard")}
        >
          <LayoutDashboard className={getIconClass("/dashboard")} size={20} />
          <span className="font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className={getButtonClass("/analytics")}
        >
          <TrendingUp className={getIconClass("/analytics")} size={20} />
          <span className="font-medium">Analytics</span>
        </button>
      </nav>

      <div className="mt-auto border-t pt-6">
        <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="mb-3 truncate text-sm font-medium text-gray-700" title={user?.email}>
            {user?.email}
            </p>

            <button
            onClick={() => {
                logout();
                navigate("/login");
            }}
            className="flex w-full items-center gap-2 rounded-lg py-2 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
            <LogOut size={16} /> Log Out
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;