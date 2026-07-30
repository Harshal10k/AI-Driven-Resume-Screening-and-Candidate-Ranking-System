import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../services/authService";

import {
  UserPlus,
  Users,
  FileText,
  Briefcase,
  Trophy,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {

      setLoading(true);

      const response = await registerUser(formData);

      alert(response.message);

      navigate("/login");

    }

    catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex h-screen overflow-hidden">

      {/* ================= LEFT PANEL ================= */}

      <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white">

        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div className="relative z-10 flex h-full w-full flex-col justify-center px-12">

          {/* Badge */}

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">

            <Sparkles size={16} />

            <span className="text-sm font-medium">

              Join the Future of Recruitment

            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">

            Build Your

            <br />

            Career with AI

          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-blue-100">

            Join CVAnalyzer and let AI match your skills
            with the right opportunities.
            Create your profile, upload your resume,
            and get discovered by recruiters faster.

          </p>

          {/* Feature Cards */}

          <div className="mt-8 space-y-4">

            <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <FileText
                size={26}
                className="mt-1"
              />

              <div>

                <h3 className="text-lg font-semibold">

                  Resume Upload

                </h3>

                <p className="mt-1 text-blue-100">

                  Upload your resume and let AI analyze your profile.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Briefcase
                size={26}
                className="mt-1"
              />

              <div>

                <h3 className="text-lg font-semibold">

                  Apply Instantly

                </h3>

                <p className="mt-1 text-blue-100">

                  Apply for multiple jobs with one profile.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Trophy
                size={26}
                className="mt-1"
              />

              <div>

                <h3 className="text-lg font-semibold">

                  AI Ranking

                </h3>

                <p className="mt-1 text-blue-100">

                  Increase your chances with intelligent candidate ranking.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT PANEL ================= */}

            <div className="flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 p-6">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl"
        >

          {/* Back */}

          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-indigo-600"
          >

            <ArrowLeft size={18} />

            Back to Home

          </Link>

          {/* Header */}

          <div className="mb-6">

            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2">

              <Sparkles
                size={16}
                className="text-indigo-600"
              />

              <span className="text-sm font-medium text-indigo-700">

                Create Your Account

              </span>

            </div>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">

              Register

            </h2>

            <p className="mt-2 text-slate-500">

              Join CVAnalyzer and unlock AI-powered recruitment.

            </p>

          </div>

          {/* Full Name */}

          <div className="mb-4">

            <label className="mb-2 block text-sm font-semibold text-slate-600">

              Full Name

            </label>

            <div className="relative">

              <UserPlus
                size={20}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Email */}

          <div className="mb-4">

            <label className="mb-2 block text-sm font-semibold text-slate-600">

              Email Address

            </label>

            <div className="relative">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H8m8-4H8m10 8H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2z"
                />

              </svg>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-4">

            <label className="mb-2 block text-sm font-semibold text-slate-600">

              Password

            </label>

            <div className="relative">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11V8a3 3 0 10-6 0v3m0 0h10a1 1 0 011 1v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6a1 1 0 011-1z"
                />

              </svg>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength={8}
                required
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />

            </div>

          </div>

          {/* Register As */}

          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-slate-600">

              Register As

            </label>

            <div className="relative">

              <Users
                size={20}
                className="absolute left-4 top-3.5 text-slate-400"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-10 transition duration-300 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >

                <option value="candidate">

                  👤 Candidate

                </option>

                <option value="employer">

                  💼 Employer

                </option>

              </select>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-4 top-4 h-4 w-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />

              </svg>

            </div>

          </div>

          {/* Create Account */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading ? (

              <>

                <svg
                  className="mr-3 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >

                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                  />

                </svg>

                Creating Account...

              </>

            ) : (

              "Create Account"

            )}

          </button>

          {/* Divider */}

          <div className="my-6 flex items-center">

            <div className="h-px flex-1 bg-slate-200"></div>

            <span className="px-4 text-sm text-slate-400">

              Already Registered?

            </span>

            <div className="h-px flex-1 bg-slate-200"></div>

          </div>

          {/* Login */}

          <p className="text-center text-sm text-slate-500">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
            >

              Sign In

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

};

export default Register;