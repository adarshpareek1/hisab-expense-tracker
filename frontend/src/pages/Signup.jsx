import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "../components/AuthCard";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const data = await signupUser({ username, email, password });
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Start your journey to financial clarity"
    >
      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
      >
        <span className="text-lg">G</span>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-xs text-[var(--light-text)]">
        <div className="h-px flex-1 bg-gray-200" />
        OR CONTINUE WITH
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <label className="mb-1 block text-sm font-medium">Username</label>
        <input
          name="username"
          type="text"
          required
          placeholder="johndoe"
          className="mb-4 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        {/* Email */}
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="mb-4 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        {/* Password */}
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="mb-4 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        {/* Error */}
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-[var(--light-text)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[var(--primary)]">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
};

export default Signup;
