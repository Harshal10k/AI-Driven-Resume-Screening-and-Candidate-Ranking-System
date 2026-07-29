import { useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import { useNavigate } from "react-router-dom";

import {
  Settings,
  Sparkles,
  User,
  Shield,
  Building2,
  Bot,
  LogOut,
  Save,
  Mail,
  Lock,
  Globe,
  Bell,
  CheckCircle,
  KeyRound,
} from "lucide-react";

const SettingsPage = () => {

  const [profile, setProfile] = useState({
    name: "System Admin",
    email: "admin@hiremind.ai",
    role: "Administrator",
  });

  const [platform, setPlatform] = useState({
    platformName: "HireMind AI",
    timezone: "Asia/Kolkata",
    language: "English",
    notifications: true,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <AdminLayout>

      <div className="space-y-8">

        {/* ================= HERO ================= */}

        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 shadow-xl">

          <div className="flex flex-col items-center justify-between gap-10 p-10 lg:flex-row">

            {/* Left */}

            <div className="max-w-3xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 backdrop-blur">

                <Sparkles
                  size={18}
                  className="text-white"
                />

                <span className="font-medium text-white">

                  Administrator Settings

                </span>

              </div>

              <h1 className="text-5xl font-bold text-white">

                Settings & Preferences

              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-8 text-indigo-100">

                Configure your administrator account,
                platform preferences, AI settings and
                security options for your AI Resume
                Screening System.

              </p>

            </div>

            {/* Right */}

            <div className="flex h-52 w-52 items-center justify-center rounded-[40px] bg-white/10 backdrop-blur">

              <Settings
                size={90}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* ================= PAGE START ================= */}

                {/* ================= PROFILE SECTION ================= */}

        <div className="grid gap-8 xl:grid-cols-3">

          {/* Left */}

          <div className="xl:col-span-2">

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">

              <div className="mb-8 flex items-center gap-4">

                <div className="rounded-2xl bg-indigo-100 p-4">

                  <User
                    size={28}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-bold text-slate-900">

                    Profile Information

                  </h2>

                  <p className="mt-1 text-slate-500">

                    Update your administrator profile.

                  </p>

                </div>

              </div>

              <div className="space-y-6">

                {/* Name */}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">

                    Full Name

                  </label>

                  <div className="relative">

                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-indigo-500"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">

                    Email Address

                  </label>

                  <div className="relative">

                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-indigo-500"
                    />

                  </div>

                </div>

                {/* Role */}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">

                    Administrator Role

                  </label>

                  <div className="relative">

                    <Shield
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={profile.role}
                      readOnly
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4"
                    />

                  </div>

                </div>

                <button className="mt-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105">

                  <Save size={20} />

                  Update Profile

                </button>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex flex-col items-center">

                <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-5xl font-bold text-white shadow-xl">

                  {profile.name.charAt(0)}

                </div>

                <h2 className="text-4xl font-bold text-slate-900">

                  {profile.name}

                </h2>

                <p className="mt-2 text-slate-500">

                  {profile.email}

                </p>

              </div>

              <div className="mt-10 space-y-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Building2
                      size={20}
                      className="text-slate-500"
                    />

                    <span className="text-slate-600">

                      Role

                    </span>

                  </div>

                  <span className="font-semibold">

                    Administrator

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <CheckCircle
                      size={20}
                      className="text-green-600"
                    />

                    <span className="text-slate-600">

                      Status

                    </span>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">

                    Active

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <KeyRound
                      size={20}
                      className="text-indigo-600"
                    />

                    <span className="text-slate-600">

                      Security

                    </span>

                  </div>

                  <span className="font-semibold">

                    JWT Protected

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

                {/* ================= DANGER ZONE ================= */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Danger Zone */}

          <div className="lg:col-span-2 rounded-[30px] border border-red-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-2xl bg-red-100 p-4">

                <LogOut
                  size={28}
                  className="text-red-600"
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-900">

                  Danger Zone

                </h2>

                <p className="mt-1 text-slate-500">

                  These actions affect your administrator account.

                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h3 className="text-xl font-semibold text-red-700">

                  Logout from Admin Panel

                </h3>

                <p className="mt-2 text-red-600">

                  End your current session securely.

                </p>

                <button
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >

                  Logout

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default SettingsPage;