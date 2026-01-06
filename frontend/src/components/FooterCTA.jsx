import { useNavigate } from "react-router-dom";

const FooterCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-24 px-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-[var(--primary)] to-[#2f8f82] px-8 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Take Control?
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-white/90 text-md">
          Join thousands of users who have transformed their financial habits with Hisab.
        </p>

        <button onClick={() => navigate("/signup")} className="rounded-xl border border-white px-7 py-3 font-medium transition hover:bg-white hover:text-[var(--primary)]">
          Get Started Free →
        </button>
      </div>
    </section>
  );
};

export default FooterCTA;
