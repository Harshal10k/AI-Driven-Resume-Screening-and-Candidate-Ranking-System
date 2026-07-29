import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { updateProfile } from "../services/authService";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  MapPin,
  Bell,
  Shield,
  Save,
  LogOut,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const CandidateSettings = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState({

      name: "",

      email: "",

      phone: "",

      education: "",

      experience: "",

      preferredRole: "",

      preferredLocation: "",

      role: "",

    });

  /* =====================================
          Load User
  ===================================== */

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (storedUser) {

      setUser({

        name:
          storedUser.name || "",

        email:
          storedUser.email || "",

        phone:
          storedUser.phone || "",

        education:
          storedUser.education || "",

        experience:
          storedUser.experience || "",

        preferredRole:
          storedUser.preferredRole || "",

        preferredLocation:
          storedUser.preferredLocation || "",

        role:
          storedUser.role || "",

      });

    }

  }, []);

  /* =====================================
          Handle Input
  ===================================== */

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =====================================
          Save Profile
  ===================================== */

  const handleUpdate = async () => {

    try {

      setLoading(true);

      const response =
        await updateProfile(user);

      localStorage.setItem(

        "user",

        JSON.stringify(response.user)

      );

      alert(
        "Profile Updated Successfully"
      );

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Failed to update profile"

      );

    }

    finally {

      setLoading(false);

    }

  };

  /* =====================================
            Logout
  ===================================== */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

<div className="min-h-screen bg-slate-100">

  <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">

    {/* ================= BACK BUTTON ================= */}

                <Link
                to="/candidate-dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-indigo-300"
                >

                <ArrowLeft size={18} />

                Back to Dashboard

                </Link>

            {/* ================= PAGE HEADER ================= */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">

              Candidate Settings

            </h1>

            <p className="mt-1 text-slate-500">

              Manage your profile, resume and career preferences.

            </p>

          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >

            <Save size={18} />

            {loading ? "Saving..." : "Save Changes"}

          </button>

        </div>

        {/* ================= PROFILE SECTION ================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* ================= PROFILE INFORMATION ================= */}

          <div className="col-span-12 lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-indigo-100 p-3">

                <User
                  size={22}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Personal Information

                </h2>

                <p className="text-sm text-slate-500">

                  Update your personal profile.

                </p>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Full Name */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Full Name

                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Email Address

                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Phone */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Phone Number

                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Education */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Highest Education

                </label>

                <div className="relative">

                  <GraduationCap
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="education"
                    value={user.education}
                    onChange={handleChange}
                    placeholder="B.Tech, MCA..."
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Experience */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Experience

                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="experience"
                    value={user.experience}
                    onChange={handleChange}
                    placeholder="0-2 Years"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Preferred Role */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Preferred Role

                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="preferredRole"
                    value={user.preferredRole}
                    onChange={handleChange}
                    placeholder="Java Developer"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ================= CANDIDATE OVERVIEW ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col items-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-3xl font-bold text-white">

                {user.name?.charAt(0).toUpperCase()}

              </div>

              <h3 className="mt-4 text-xl font-bold">

                {user.name}

              </h3>

              <p className="text-sm text-slate-500">

                {user.email}

              </p>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between border-b pb-3">

                <span className="text-slate-500">

                  Role

                </span>

                <span className="font-semibold">

                  Candidate

                </span>

              </div>

              <div className="flex items-center justify-between border-b pb-3">

                <span className="text-slate-500">

                  Resume

                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Uploaded

                </span>

              </div>

              <div className="flex items-center justify-between border-b pb-3">

                <span className="text-slate-500">

                  Profile

                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                  Complete

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  AI Resume Score

                </span>

                <span className="font-bold text-indigo-600">

                  87%

                </span>

              </div>

            </div>

          </div>

        </div>

                {/* ================= SETTINGS GRID ================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* ================= CAREER PREFERENCES ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-indigo-100 p-3">

                <MapPin
                  size={22}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Career Preferences

                </h2>

                <p className="text-sm text-slate-500">

                  Your preferred opportunities

                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Preferred Location

                </label>

                <div className="relative">

                  <MapPin
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="preferredLocation"
                    value={user.preferredLocation}
                    onChange={handleChange}
                    placeholder="Bangalore"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Preferred Role

                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="preferredRole"
                    value={user.preferredRole}
                    onChange={handleChange}
                    placeholder="Backend Developer"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Experience

                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="experience"
                    value={user.experience}
                    onChange={handleChange}
                    placeholder="0 - 2 Years"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ================= RESUME ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-3">

                <FileText
                  size={22}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Resume

                </h2>

                <p className="text-sm text-slate-500">

                  Resume status & profile

                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <span>

                  Resume Status

                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Uploaded

                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <span>

                  ATS Compatibility

                </span>

                <span className="font-bold text-indigo-600">

                  91%

                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <span>

                  Last Updated

                </span>

                <span className="font-medium">

                  Today

                </span>

              </div>

              <button className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">

                Update Resume

              </button>

            </div>

          </div>

          {/* ================= NOTIFICATIONS ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-yellow-100 p-3">

                <Bell
                  size={22}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Notifications

                </h2>

                <p className="text-sm text-slate-500">

                  Stay updated

                </p>

              </div>

            </div>

            <div className="space-y-5">

              <label className="flex items-center justify-between">

                <span>Email Notifications</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between">

                <span>Job Recommendations</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between">

                <span>Interview Alerts</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between">

                <span>Weekly Career Report</span>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

            </div>

          </div>

        </div>

                {/* ================= SECURITY & LOGOUT ================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* ================= SECURITY ================= */}

          <div className="col-span-12 lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-indigo-100 p-3">

                <Shield
                  size={22}
                  className="text-indigo-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Security

                </h2>

                <p className="text-sm text-slate-500">

                  Protect your candidate account

                </p>

              </div>

            </div>

            <div className="space-y-4">

              {/* Password */}

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-300">

                <div>

                  <h3 className="font-semibold">

                    Password

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    Last updated recently

                  </p>

                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400"
                />

              </div>

              {/* Authentication */}

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-300">

                <div>

                  <h3 className="font-semibold">

                    Authentication

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    JWT authentication enabled

                  </p>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Active

                </span>

              </div>

              {/* Profile Status */}

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-300">

                <div>

                  <h3 className="font-semibold">

                    Profile Status

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    Your profile is ready for recruiters

                  </p>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-green-700">

                  <CheckCircle2 size={16} />

                  Complete

                </div>

              </div>

            </div>

          </div>

          {/* ================= LOGOUT ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

            <div className="flex h-full flex-col justify-between">

              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                  <LogOut
                    size={24}
                    className="text-red-600"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-bold">

                  Logout

                </h2>

                <p className="mt-3 text-slate-500 leading-7">

                  Sign out from your account securely.
                  You can log in again anytime to continue
                  applying for jobs.

                </p>

              </div>

              <button

                onClick={handleLogout}

                className="mt-8 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"

              >

                Logout

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default CandidateSettings;