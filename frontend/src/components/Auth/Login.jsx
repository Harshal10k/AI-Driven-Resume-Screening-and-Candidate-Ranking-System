import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-container overflow-hidden items-center justify-center p-xl">
        {/* Decorative blobs */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-12 w-48 h-48 bg-tertiary-container/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-md py-xs rounded-full border border-white/20 backdrop-blur-sm mb-lg">
              <span
                className="material-symbols-outlined text-headline-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="font-label-md text-label-md">Trusted by 500+ Enterprise Teams</span>
            </span>
            <h1 className="font-display text-display leading-tight mb-md">
              Elevate Your Hiring Intelligence.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container opacity-90">
              HireSense AI bridges the gap between top-tier talent and forward-thinking
              organizations using precision analytics.
            </p>
          </div>

          {/* Testimonial card */}
          <div
            className="p-lg rounded-xl text-on-surface"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(226,232,240,0.5)",
            }}
          >
            <div className="flex items-center gap-md mb-sm">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
              </div>
              <div>
                <p className="font-label-md text-label-md font-bold">Sarah Jenkins</p>
                <p className="text-xs text-on-surface-variant">VP of Talent, TechFlow</p>
              </div>
            </div>
            <p className="italic text-body-sm">
              "HireSense AI reduced our time-to-hire by 40% in the first quarter alone. The AI
              rankings are incredibly accurate."
            </p>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex flex-col bg-surface-container-lowest justify-center items-center p-xl">
        <div className="w-full max-w-md">
          {/* Brand anchor */}
          <div className="mb-xl flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md text-primary font-extrabold tracking-tight">
                HireSense AI
              </h2>
              <p className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
                Enterprise Intelligence
              </p>
            </div>
          </div>

          <div className="mb-xl">
            <h3 className="font-headline-lg text-headline-lg mb-sm">Welcome back</h3>
            <p className="text-on-surface-variant">
              Enter your credentials to access your talent dashboard.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-md px-md py-sm rounded-lg bg-error-container text-on-error-container text-body-sm">
              {error}
            </div>
          )}

          {/* Login form */}
          <form className="space-y-md" onSubmit={handleSubmit}>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                Email
              </label>
              <input
                className="w-full px-lg py-sm border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                name="email"
                onChange={handleChange}
                placeholder="name@company.com"
                required
                type="email"
                value={formData.email}
              />
            </div>

            <div className="space-y-xs">
              <div className="flex justify-between items-center px-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Password
                </label>
              </div>
              <input
                className="w-full px-lg py-sm border border-outline rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/40"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                required
                type="password"
                value={formData.password}
              />
            </div>

            <button
              className="w-full bg-primary text-white py-sm rounded-lg font-headline-sm hover:bg-secondary transition-all active:scale-95 shadow-lg shadow-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-xl text-center text-body-sm text-on-surface-variant">
            Don't have an account?{" "}
            <Link className="text-primary font-bold hover:underline" to="/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
