import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import FooterCTA from "../components/FooterCTA";
import { useNavigate } from "react-router-dom";
import { Wallet, CreditCard, Target, ChartColumn, ChartNoAxesCombined, Puzzle, LockKeyhole } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-b from-[var(--primary-light)] to-white px-6 py-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-4 py-1 text-md font-medium text-[var(--primary)]">
          {<Target className="text-[var(--primary)]" />} Track Every Penny, Achieve Every Goal
        </span>

        <h1 className="mb-6 text-4xl font-bold text-[var(--dark-text)] md:text-5xl">
          Your Money,{" "}
          <span className="text-[var(--primary)]">Your Rules</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-[var(--light-text)] text-lg">
          Hisab makes expense tracking effortless. Set budgets, analyze spending
          patterns, and take control of your financial future with beautiful insights.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={() => navigate("/signup")} className="rounded-xl bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:opacity-90">
            Start Free Today →
          </button>

          <button
            className="rounded-xl border border-gray-200 px-7 py-3 font-medium text-gray-700 transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]/10 hover:text-[var(--primary)] hover:shadow-sm"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-[var(--dark-text)]">
          Everything You Need to{" "}
          <span className="text-[var(--primary)]">Manage Money</span>
        </h2>

        <p className="mx-auto mb-16 max-w-2xl text-center text-[var(--light-text)] text-lg">
          Simple yet powerful tools to help you understand where your money goes
          and how to make it work harder for you.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<CreditCard className="text-[var(--primary)]" />}
            title="Easy Expense Tracking"
            description="Add expenses in seconds with smart categorization. Track food, transport, shopping, and more."
          />

          <FeatureCard
            icon={<Target className="text-[var(--primary)]" />}
            title="Budget Management"
            description="Set monthly budgets and get real-time alerts when you're approaching your limits."
          />

          <FeatureCard
            icon={<ChartColumn className="text-[var(--primary)]" />}
            title="Visual Analytics"
            description="Beautiful charts and graphs that make understanding spending patterns intuitive."
          />

          <FeatureCard
            icon={<ChartNoAxesCombined className="text-[var(--primary)]" />}
            title="Spending Trends"
            description="Track daily, weekly, and monthly spending trends to optimize expenses."
          />

          <FeatureCard
            icon={<Puzzle className="text-[var(--primary)]" />}
            title="Category Insights"
            description="Get detailed category-wise breakdowns with percentage analysis."
          />

          <FeatureCard
            icon={<LockKeyhole className="text-[var(--primary)]" />}
            title="Secure & Private"
            description="Your financial data is encrypted and protected. We never share your data."
          />
        </div>

        <FooterCTA />
      </section>
    </>
  );
};

export default Home;
