import { Link } from "react-router-dom";
import logo from "../assets/Landing logo.svg";
import {
  Menu,
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Users,
  FileText,
  Briefcase,
  BarChart3,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">

      {/* ========================= NAVBAR ========================= */}

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <img
                src={logo}
                alt="CV Analyzer Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h1 className="font-bold text-2xl text-slate-900">
                CV Analyzer
              </h1>

              <p className="text-xs text-slate-500">
                Smart Recruitment Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-10">

            <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-medium text-blue-700">
            Home
            </button>

            <a href="#features" className="text-slate-600 hover:text-blue-700 transition">
              Features
            </a>

            <a href="#workflow" className="text-slate-600 hover:text-blue-700 transition">
              Workflow
            </a>

            <a href="#about" className="text-slate-600 hover:text-blue-700 transition">
              About
            </a>

            <a href="#contact" className="text-slate-600 hover:text-blue-700 transition">
              Contact
            </a>

          </nav>

          {/* Buttons */}

          <div className="hidden lg:flex items-center gap-4">

            <Link
              to="/login"
              className="font-semibold text-slate-700 hover:text-blue-700 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
            >
              Get Started
            </Link>

          </div>

          <button className="lg:hidden">
            <Menu size={28} />
          </button>

        </div>

      </header>

      {/* ========================= HERO ========================= */}

      <section className="relative pt-36 pb-24">

        {/* Background */}

        <div className="absolute inset-0 -z-10">

          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-[140px] opacity-30"></div>

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full blur-[140px] opacity-30"></div>

        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-5 py-2 mb-8 font-semibold">

              🚀 AI Powered Recruitment Platform

            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-slate-900">

              Hire Smarter

              <br />

              with

              <span className="text-blue-600">
                {" "}
                Artificial Intelligence
              </span>

            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-9 max-w-2xl">

              Automate resume screening, rank candidates,
              detect hiring bias, and recruit top talent
              faster using advanced AI technology.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-semibold shadow-xl"
              >

                Get Started

                <ArrowRight size={20} />

              </Link>

            </div>

            {/* Features */}

            <div className="grid grid-cols-2 gap-5 mt-12">

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-500" />

                <span>AI Resume Ranking</span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-500" />

                <span>Skill Matching</span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-500" />

                <span>Bias Detection</span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle className="text-green-500" />

                <span>Analytics Dashboard</span>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Main Card */}

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

              {/* Header */}

              <div className="flex justify-between items-center p-6 border-b">

                <div>

                  <h3 className="font-bold text-xl">
                    Hiring Dashboard
                  </h3>

                  <p className="text-slate-500 text-sm">
                    Live Candidate Analysis
                  </p>

                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                  Live
                </div>

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-4 p-6">

                <div className="bg-blue-50 rounded-2xl p-5">

                  <Users className="text-blue-600 mb-3" />

                  <h2 className="text-3xl font-bold">1,248</h2>

                  <p className="text-slate-500">
                    Applicants
                  </p>

                </div>

                <div className="bg-green-50 rounded-2xl p-5">

                  <FileText className="text-green-600 mb-3" />

                  <h2 className="text-3xl font-bold">318</h2>

                  <p className="text-slate-500">
                    Shortlisted
                  </p>

                </div>

                <div className="bg-purple-50 rounded-2xl p-5">

                  <Briefcase className="text-purple-600 mb-3" />

                  <h2 className="text-3xl font-bold">28</h2>

                  <p className="text-slate-500">
                    Open Jobs
                  </p>

                </div>

                <div className="bg-orange-50 rounded-2xl p-5">

                  <BarChart3 className="text-orange-600 mb-3" />

                  <h2 className="text-3xl font-bold">96%</h2>

                  <p className="text-slate-500">
                    AI Accuracy
                  </p>

                </div>

              </div>

              {/* Candidate Card */}

              <div className="px-6 pb-6">

                <div className="border rounded-2xl p-5 flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-lg">
                      John Anderson
                    </h3>

                    <p className="text-slate-500">
                      Full Stack Developer
                    </p>

                  </div>

                  <div className="text-right">

                    <h2 className="text-3xl font-bold text-green-600">
                      98%
                    </h2>

                    <p className="text-sm text-slate-500">
                      Skill Match
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Floating Badge */}

            <div className="absolute -left-8 top-24 bg-white rounded-2xl shadow-xl p-5 hidden lg:block">

              <p className="text-sm text-slate-500">
                Time Saved
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                80%
              </h2>

            </div>

            <div className="absolute -right-6 bottom-10 bg-white rounded-2xl shadow-xl p-5 hidden lg:block">

              <p className="text-sm text-slate-500">
                Top Candidate
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                99%
              </h2>

            </div>

          </div>

        </div>

      </section>

      {/* ========================= FEATURES ========================= */}

      <section
        id="features"
        className="py-28 bg-slate-50"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

              Powerful AI Features

            </span>

            <h2 className="text-5xl font-bold mt-6 text-slate-900">

              Everything You Need
              <br />
              To Hire Better

            </h2>

            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-9">

              Our AI-powered platform helps recruiters screen,
              rank, analyze, and hire top candidates with
              incredible speed and accuracy.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

            {/* Card */}

            {[
              {
                icon: "🤖",
                title: "AI Resume Screening",
                desc:
                  "Automatically parse resumes and identify the best candidates in seconds.",
              },

              {
                icon: "🎯",
                title: "Candidate Ranking",
                desc:
                  "Rank applicants intelligently based on skills, experience, and education.",
              },

              {
                icon: "⚡",
                title: "Skill Matching",
                desc:
                  "Match resumes with job descriptions using AI-powered semantic analysis.",
              },

              {
                icon: "📊",
                title: "Hiring Analytics",
                desc:
                  "Visual dashboards to track recruitment performance and KPIs.",
              },

              {
                icon: "🛡️",
                title: "Bias Detection",
                desc:
                  "Promote fair hiring by identifying and reducing hiring bias.",
              },

              {
                icon: "📂",
                title: "Job Management",
                desc:
                  "Create, manage, and monitor multiple hiring campaigns effortlessly.",
              },

            ].map((feature, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">

                  {feature.icon}

                </div>

                <h3 className="text-2xl font-bold mt-8">

                  {feature.title}

                </h3>

                <p className="text-slate-600 mt-4 leading-8">

                  {feature.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ========================= HOW IT WORKS ========================= */}

      <section
        id="workflow"
        className="py-28 bg-gradient-to-r from-slate-900 to-blue-900 text-white"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="bg-blue-600 px-5 py-2 rounded-full">

              Simple Process

            </span>

            <h2 className="text-5xl font-bold mt-6">

              Hire in 3 Easy Steps

            </h2>

            <p className="text-blue-200 mt-6 text-xl">

              AI handles the heavy lifting while
              you focus on selecting the perfect candidate.

            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-10 mt-20">

            {/* STEP 1 */}

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10">

              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">

                1

              </div>

              <h3 className="text-3xl font-bold mt-8">

                Upload Resume

              </h3>

              <p className="mt-5 text-blue-100 leading-8">

                Upload one or bulk of resumes.
                AI instantly extracts candidate information.

              </p>

            </div>

            {/* STEP 2 */}

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10">

              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">

                2

              </div>

              <h3 className="text-3xl font-bold mt-8">

                AI Analysis

              </h3>

              <p className="mt-5 text-blue-100 leading-8">

                Resume parsing, candidate ranking,
                skill matching, and bias detection happen automatically.

              </p>

            </div>

            {/* STEP 3 */}

            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10">

              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">

                3

              </div>

              <h3 className="text-3xl font-bold mt-8">

                Hire Top Talent

              </h3>

              <p className="mt-5 text-blue-100 leading-8">

                Review AI-ranked candidates,
                shortlist the best profiles,
                and schedule interviews.

              </p>

            </div>

          </div>

        </div>

      </section>

            {/* ========================= TESTIMONIALS ========================= */}

      <section   id="about" className="py-28 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

              Testimonials

            </span>

            <h2 className="text-5xl font-bold mt-6 text-slate-900">

              Preferred by Recruiters

            </h2>

            <p className="mt-6 text-xl text-slate-600">

              See what hiring professionals say about AI CV Analyzer.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">

            {[
              {
                name: "Sarah Johnson",
                role: "HR Manager",
                company: "Infosys",
              },

              {
                name: "David Wilson",
                role: "Talent Acquisition",
                company: "Amazon",
              },

              {
                name: "Priya Sharma",
                role: "Recruitment Lead",
                company: "Accenture",
              },

            ].map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition"
              >

                <div className="flex text-yellow-400 text-xl">

                  ⭐⭐⭐⭐⭐

                </div>

                <p className="mt-6 text-slate-600 leading-8">

                  "CV Analyzer AI reduced our hiring time dramatically.
                  Candidate ranking is accurate and the dashboard is
                  incredibly easy to use."

                </p>

                <div className="flex items-center gap-4 mt-8">

                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                    {item.name.charAt(0)}

                  </div>

                  <div>

                    <h4 className="font-bold">

                      {item.name}

                    </h4>

                    <p className="text-sm text-slate-500">

                      {item.role}

                    </p>

                    <p className="text-sm text-blue-600">

                      {item.company}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ========================= CTA ========================= */}

      <section className="py-28">

        <div className="max-w-6xl mx-auto px-6">

          <div className="rounded-[40px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-10 py-20 text-center shadow-2xl">

            <h2 className="text-5xl font-bold">

              Ready to Hire Smarter?

            </h2>

            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-9">

              Join companies using AI-powered recruitment
              to identify top talent, reduce hiring time,
              and improve recruitment accuracy.

            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-12">

              <Link
                to="/register"
                className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition"
              >
                Get Started Free
              </Link>

              <Link
                to="/login"
                className="border border-white px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ========================= FOOTER ========================= */}

      <footer
        id="contact"
        className="bg-slate-900 text-slate-300 pt-20"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Logo */}

            <div>

              <div className="flex items-center gap-3">

                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="CV Analyzer Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                <div>

                  <h2 className="font-bold text-2xl text-white">

                    CV Analyzer

                  </h2>

                </div>

              </div>

              <p className="mt-6 leading-8">

                AI-powered Resume Screening &
                Candidate Ranking Platform built
                for modern recruiters.

              </p>

            </div>

            {/* Product */}

            <div>

              <h3 className="text-white font-semibold text-xl">

                Product

              </h3>

              <ul className="space-y-4 mt-6">

                <li>Features</li>

                <li>Dashboard</li>

                <li>Analytics</li>

                <li>AI Ranking</li>

              </ul>

            </div>

            {/* Company */}

            <div>

              <h3 className="text-white font-semibold text-xl">

                Company

              </h3>

              <ul className="space-y-4 mt-6">

                <li>About</li>

                <li>Careers</li>

                <li>Privacy Policy</li>

                <li>Terms & Conditions</li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h3 className="text-white font-semibold text-xl">

                Contact

              </h3>

              <ul className="space-y-4 mt-6">

                <li>support@cvanalyzer.ai</li>

                <li>+91 9876543210</li>

                <li>Bangalore, India</li>

                <li>24 × 7 Support</li>

              </ul>

            </div>

          </div>

          <div className="border-t border-slate-700 mt-16 py-8 flex flex-col md:flex-row justify-between items-center">

            <p className="text-sm">

              © 2026 CV Analyzer AI. All rights reserved.

            </p>

            <div className="flex gap-6 mt-6 md:mt-0">

              <a href="#" className="hover:text-white transition">

                LinkedIn

              </a>

              <a href="#" className="hover:text-white transition">

                GitHub

              </a>

              <a href="#" className="hover:text-white transition">

                Twitter

              </a>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;