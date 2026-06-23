import AdminLayout from "../layouts/AdminLayout";
import { useState, useEffect } from "react";
import CreateHRModal from "../components/CreateHRModal";
import { getHRs } from "../services/adminService";
import {
  deleteHr,
} from "../services/adminService";

const HRManagement = () => {

  const [showModal, setShowModal] =
    useState(false);

  const [hrs, setHrs] = useState([]);

    const fetchHRs = async () => {

    try {

      const data =
        await getHRs();

      setHrs(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (
  id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this employer?"
      );

    if (!confirmDelete) return;

    try {

      await deleteHr(id);

      setHrs(
        hrs.filter(
          (hr) =>
            hr._id !== id
        )
      );

    } catch (error) {

      alert(
        "Delete failed"
      );

    }

  };

  useEffect(() => {

    fetchHRs();

  }, []);

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            HR Management
          </h1>

          <p className="text-slate-500 mt-1">
            Create and manage HR accounts
          </p>

        </div>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
        >
          + Create HR
        </button>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Email
              </th>

              <th className="text-left p-4">
                Department
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {hrs.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="p-6 text-center text-slate-500"
                >
                  No HR Accounts Yet
                </td>

              </tr>

            ) : (

              hrs.map((hr) => (

                <tr
                  key={hr._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {hr.name}
                  </td>

                  <td className="p-4">
                    {hr.email}
                  </td>

                  <td className="p-4">
                    {hr.department}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          hr._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {showModal && (
        <CreateHRModal
          setShowModal={setShowModal}
        />
      )}

    </AdminLayout>
  );
};

export default HRManagement;