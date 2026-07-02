import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordStrength = (() => {
    const pw = formData.password;
    if (!pw) return { score: 0, label: "Too short" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] };
  })();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!formData.role) {
      setError("Please select whether you're an employer or candidate.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await register(formData.fullName.trim(), formData.email, formData.password, formData.role);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-container overflow-hidden items-center justify-center p-xl">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-12 w-48 h-48 bg-tertiary-container/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-xl">
            <span className="inline-flex items-center gap-2 bg-white/10 px-md py-xs rounded-full border border-white/20 backdrop-blur-sm mb-lg">
              <span
                className="material-symbols-outlined text-headline-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-md text-label-md">AI-Powered Screening</span>
            </span>
            <h1 className="font-display text-display leading-tight mb-md">
              Find the Right Fit. Every Time.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container opacity-90">
              Upload resumes in bulk, let Gemini AI rank your candidates with match scores, skill
              breakdowns, and plain-English explanations.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-md">
            {[
              { icon: "upload_file", text: "Bulk PDF & DOCX upload" },
              { icon: "insights", text: "AI match scores 0–100" },
              { icon: "download", text: "Export shortlist as CSV" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-md">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}
                  >
                    {icon}
                  </span>
                </div>
                <span className="text-body-md text-on-primary-container opacity-90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex flex-col bg-surface-container-lowest justify-center items-center p-xl overflow-y-auto">
        <div className="w-full max-w-md py-xl">
          {/* Mobile-only brand anchor */}
          <div className="lg:hidden mb-xl flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm font-extrabold text-primary">
              HireSense AI
            </span>
          </div>

          <div className="mb-xl">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-xs">
              Create your account
            </h2>
            <p className="text-on-surface-variant font-body-md">
              Join over 5,000+ talent teams building the future.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-md px-md py-sm rounded-lg bg-error-container text-on-error-container text-body-sm">
              {error}
            </div>
          )}

          {/* Social Sign Up */}
          <button
            className="w-full flex items-center justify-center gap-md py-3 px-md border border-outline rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-all active:scale-95 duration-200 mb-lg"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.2l6-6C34.9 4.2 29.8 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.1-2.7-.5-4z"
                fill="#FFC107"
              />
              <path
                d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.3 0 6.3 1.2 8.6 3.2l6-6C34.9 6.2 29.8 4 24 4c-8.1 0-15 4.7-18.7 11.6.4-.3 1-.6 1-.9z"
                fill="#FF3D00"
              />
              <path
                d="M24 44c5.8 0 10.7-1.9 14.5-5.2l-6.7-5.6C29.7 35 27 36 24 36c-6.1 0-11.2-3.9-13.1-9.3l-7 5.4C7.6 39.4 15.1 44 24 44z"
                fill="#4CAF50"
              />
              <path
                d="M44.5 20H24v8.5h11.8c-.9 3.4-2.9 6.2-5.7 8l6.7 5.6C40.6 38.5 44 32.1 44 24c0-1.3-.1-2.7-.5-4z"
                fill="#1976D2"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="relative my-lg flex items-center">
            <div className="flex-grow border-t border-outline/30" />
            <span className="px-md text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest bg-surface-container-lowest">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-outline/30" />
          </div>

          <form className="space-y-lg" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  person
                </span>
                <input
                  className="w-full pl-[48px] pr-md py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface"
                  name="fullName"
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  type="text"
                  value={formData.fullName}
                />
              </div>
            </div>

            {/* Corporate Email */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                Corporate Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  mail
                </span>
                <input
                  className="w-full pl-[48px] pr-md py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface"
                  name="email"
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                I am joining as a...
              </label>
              <div className="grid grid-cols-2 gap-md">
                <label className="relative cursor-pointer group">
                  <input
                    checked={formData.role === "employer"}
                    className="peer sr-only"
                    name="role"
                    onChange={() => setFormData((prev) => ({ ...prev, role: "employer" }))}
                    type="radio"
                    value="employer"
                  />
                  <div className="flex flex-col items-center justify-center p-md border border-outline rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 transition-all group-hover:bg-surface-container-low">
                    <span className="material-symbols-outlined text-outline peer-checked:text-primary mb-xs">
                      business_center
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">Employer</span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input
                    checked={formData.role === "candidate"}
                    className="peer sr-only"
                    name="role"
                    onChange={() => setFormData((prev) => ({ ...prev, role: "candidate" }))}
                    type="radio"
                    value="candidate"
                  />
                  <div className="flex flex-col items-center justify-center p-md border border-outline rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 transition-all group-hover:bg-surface-container-low">
                    <span className="material-symbols-outlined text-outline peer-checked:text-primary mb-xs">
                      person_search
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">Candidate</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input
                  className="w-full pl-[48px] pr-[48px] py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface"
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <button
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-md">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="flex gap-xs mt-xs px-xs">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${
                      i < passwordStrength.score ? "bg-primary" : "bg-primary/20"
                    }`}
                  />
                ))}
              </div>
              {formData.password && (
                <p className="font-label-sm text-label-sm text-on-surface-variant px-xs">
                  Password strength: <span className="text-primary font-bold">{passwordStrength.label}</span>
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface-variant ml-xs">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input
                  className="w-full pl-[48px] pr-md py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-on-surface"
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  type="password"
                  value={formData.confirmPassword}
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-sm px-xs pt-xs">
              <input
                checked={agreedToTerms}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-outline"
                id="terms"
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                type="checkbox"
              />
              <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                I agree to the{" "}
                <a className="text-primary hover:underline" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="text-primary hover:underline" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              className="w-full py-4 bg-primary text-white rounded-xl font-headline-sm text-headline-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>
          </form>

          <p className="mt-2xl text-center text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link className="text-primary font-bold hover:underline ml-xs" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}