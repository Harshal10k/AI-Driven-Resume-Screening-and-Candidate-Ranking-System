import { useState } from "react";
import { createHR } from "../services/adminService";

const CreateHRModal = ({
  setShowModal,
}) => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      department: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createHR(
          formData
        );

        alert(
          "HR Created Successfully"
        );

        setShowModal(false);

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      }

    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-2xl w-[450px]">

        <h2 className="text-2xl font-bold mb-4">
          Create HR
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
            >
              Create
            </button>

            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="border px-5 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateHRModal;