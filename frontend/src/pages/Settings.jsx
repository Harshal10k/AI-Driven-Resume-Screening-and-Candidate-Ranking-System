import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "../services/authService";

const Settings = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleUpdate = async () => {

    try {

      const data =
        await updateProfile(formData);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(
        "Profile Updated Successfully"
      );

      window.location.reload();

    } catch {

      alert(
        "Failed To Update Profile"
      );

    }

  };

  return (
    <MainLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your account
        </p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Profile Information
        </h2>

        <div className="max-w-xl space-y-4">

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Full Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Email Address
          </label>

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Update Profile
        </button>

      </div>

      </div>  

      <div className="bg-white rounded-2xl border shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-6">
          Security
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </MainLayout>
  );
};

export default Settings;