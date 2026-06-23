import { useState } from "react";

const JobModal = ({ setShowModal, addJob }) => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    experience: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.department) return;

    addJob(formData);

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[500px]">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">
            Create New Job
          </h2>

          <button
            onClick={() => setShowModal(false)}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience Required"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowModal(false)}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Create Job
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobModal;