import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { updateProfile } from "../services/authService";

import {
  User,
  Mail,
  Building2,
  Briefcase,
  Shield,
  Bell,
  Monitor,
  Save,
  LogOut,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const SettingsPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState({

      name: "",

      email: "",

      role: "",

      company: "",

      department: "",

    });

  /* ==========================
        Load User
  ========================== */

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

        role:
          storedUser.role || "",

        company:
          storedUser.company || "",

        department:
          storedUser.department || "",

      });

    }

  }, []);

  /* ==========================
        Handle Input
  ========================== */

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]:
        e.target.value,

    });

  };

  /* ==========================
        Save Profile
  ========================== */

  const handleUpdate = async () => {

    try {

      setLoading(true);

      const data =
        await updateProfile(user);

      localStorage.setItem(

        "user",

        JSON.stringify(data.user)

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

  /* ==========================
        Logout
  ========================== */

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

                {/* ================= PAGE HEADER ================= */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">

              Settings

            </h1>

            <p className="mt-1 text-slate-500">

              Manage your profile, security and account preferences.

            </p>

          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >

            <Save size={18} />

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

        {/* ================= TOP SECTION ================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* ================= PROFILE ================= */}

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

                  Profile Information

                </h2>

                <p className="text-sm text-slate-500">

                  Update your personal details.

                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Name */}

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

              {/* Company */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Company

                </label>

                <div className="relative">

                  <Building2
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="company"
                    value={user.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

              {/* Department */}

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-600">

                  Department

                </label>

                <div className="relative">

                  <Briefcase
                    size={18}
                    className="absolute left-4 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-600"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ================= ACCOUNT OVERVIEW ================= */}

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

                <span className="font-semibold capitalize">

                  {user.role}

                </span>

              </div>

              <div className="flex items-center justify-between border-b pb-3">

                <span className="text-slate-500">

                  Status

                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Active

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-slate-500">

                  Authentication

                </span>

                <span className="font-semibold">

                  JWT

                </span>

              </div>

            </div>

          </div>

        </div>

                {/* ================= SETTINGS CARDS ================= */}

        <div className="grid grid-cols-12 gap-6">

          {/* ================= SECURITY ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

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

                  Account protection

                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <h3 className="font-medium">

                    Password

                  </h3>

                  <p className="text-sm text-slate-500">

                    Last updated recently

                  </p>

                </div>

                <ChevronRight
                  size={18}
                  className="text-slate-400"
                />

              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">

                <div>

                  <h3 className="font-medium">

                    Authentication

                  </h3>

                  <p className="text-sm text-slate-500">

                    JWT Enabled

                  </p>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                  Active

                </span>

              </div>

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

                  Manage alerts

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

                <span>Job Alerts</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

              <label className="flex items-center justify-between">

                <span>Weekly Reports</span>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-indigo-600"
                />

              </label>

            </div>

          </div>

          {/* ================= PREFERENCES ================= */}

          <div className="col-span-12 lg:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-violet-100 p-3">

                <Monitor
                  size={22}
                  className="text-violet-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold">

                  Preferences

                </h2>

                <p className="text-sm text-slate-500">

                  Application settings

                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                <span>Theme</span>

                <span className="font-medium">

                  Light

                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                <span>Language</span>

                <span className="font-medium">

                  English

                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                <span>Timezone</span>

                <span className="font-medium">

                  Asia/Kolkata

                </span>

              </div>

            </div>

          </div>

        </div>

                {/* ================= DANGER ZONE ================= */}

        <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-red-100 p-3">

                  <LogOut
                    size={22}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">

                    Logout

                  </h2>

                  <p className="text-sm text-slate-500">

                    Sign out from your current session securely.

                  </p>

                </div>

              </div>

            </div>

            {/* Right */}

            <button

              onClick={handleLogout}

              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-red-700"

            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default SettingsPage;