import { useState, useEffect } from "react";
import { X, User, Mail, Lock, Building2 } from "lucide-react";
import {
  createEmployer,
  updateEmployer,
} from "../services/adminService";

const CreateEmployerModal = ({
  employer = null,
  isEditing = false,
  setIsEditing,
  setShowModal,
  fetchEmployers,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    department: "",
  });

  useEffect(() => {
    if (employer) {
      setFormData({
        name: employer?.name || "",
        email: employer?.email || "",
        password: "",
        company: employer?.company || "",
        department: employer?.department || "",
      });
    }
  }, [employer]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isEditing) {
        response = await updateEmployer(
          employer._id,
          {
            name: formData.name,
            email: formData.email,
            department: formData.department,
          }
        );
      } else {
        response = await createEmployer(formData);
      }

      if (response.success) {
        alert(
          isEditing
            ? "Employer Updated Successfully"
            : "Employer Created Successfully"
        );

        await fetchEmployers();

        setShowModal(false);

        setIsEditing(false);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">

              {isEditing
                ? "Edit Employer"
                : "Create Employer"}

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {isEditing
                ? "Update HR account information."
                : "Create a new HR account."}

            </p>

          </div>

          <button
            onClick={() => {
              setShowModal(false);
              setIsEditing(false);
            }}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 focus:border-indigo-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 focus:border-indigo-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {!isEditing && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-slate-400"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 focus:border-indigo-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Company <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="company"
                placeholder="Google"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Department
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 py-4 px-4 outline-none focus:border-indigo-500"
              >
                <option value="">Select Department</option>
                <option>Human Resources</option>
                <option>Talent Acquisition</option>
                <option>Recruitment</option>
                <option>Operations</option>
                <option>Management</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2 font-medium text-white hover:opacity-90"
            >
              {isEditing
                ? "Update Employer"
                : "Create Employer"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployerModal;