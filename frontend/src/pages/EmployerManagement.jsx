import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import EmployerToolbar from "../components/admin/EmployerToolbar";
import EmployerStats from "../components/admin/EmployerStats";
import EmployerCard from "../components/admin/EmployerCard";
import EmployerDetailsDrawer from "../components/admin/EmployerDetailsDrawer";
import DeleteEmployerModal from "../components/admin/DeleteEmployerModal";
import CreateEmployerModal from "../components/CreateEmployerModal";

import {
  getEmployers,
  deleteEmployer,
} from "../services/adminService";

import { Search } from "lucide-react";

const EmployerManagement = () => {

  const [employers, setEmployers] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedEmployer, setSelectedEmployer] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);

  const [deleteEmployerId, setDeleteEmployerId] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {

    fetchEmployers();

  }, []);

  const fetchEmployers = async () => {

    try {

      const response =
        await getEmployers();

      if (response.success) {

        setEmployers(response.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const filteredEmployers =
    employers.filter((emp) =>

      emp.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      emp.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  const handleDelete = async () => {

    try {

      await deleteEmployer(
        deleteEmployerId
      );

      await fetchEmployers();

      setDeleteEmployerId(null);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AdminLayout>

      <div className="space-y-8">

        {/* Hero */}

        <EmployerToolbar
          totalEmployers={employers.length}
          onCreate={() => {
            setSelectedEmployer(null);
            setIsEditing(false);
            setShowModal(true);
          }}
        />

        {/* Statistics */}

        <EmployerStats
          employers={employers}
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search employer by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              />

            </div>

            {/* Filter */}

            <select
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >

              <option>All Companies</option>

              <option>Assigned</option>

              <option>Not Assigned</option>

            </select>

          </div>

        </div>

        {/* Employer Cards */}

        <div className="space-y-3">

          {filteredEmployers.length > 0 ? (

            filteredEmployers.map(
              (employer) => (

                <EmployerCard

                  key={employer._id}

                  employer={employer}

                  onView={() => {

                    setSelectedEmployer(
                      employer
                    );

                    setShowDrawer(true);

                  }}

                  onEdit={() => {

                    setSelectedEmployer(
                      employer
                    );

                    setIsEditing(true);

                    setShowModal(true);

                  }}

                  onDelete={() => {

                    setDeleteEmployerId(
                      employer._id
                    );

                  }}

                />

              )

            )

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">

              <h2 className="text-xl font-semibold text-slate-800">
                No employers found
              </h2>

              <p className="mt-2 text-slate-500">
                Try changing your search or create a new employer.
              </p>

            </div>

          )}

        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-sm">

          <p>

            Showing

            <span className="mx-1 font-semibold text-slate-800">

              {filteredEmployers.length}

            </span>

            of

            <span className="mx-1 font-semibold text-slate-800">

              {employers.length}

            </span>

            employers

          </p>

          <p>

            Total Records

          </p>

        </div>

      </div>

      {/* Drawer */}

      <EmployerDetailsDrawer

        open={showDrawer}

        employer={selectedEmployer}

        onClose={() =>
          setShowDrawer(false)
        }

      />

      {/* Create/Edit Modal */}

      {showModal && (

        <CreateEmployerModal

          employer={selectedEmployer}

          isEditing={isEditing}

          setIsEditing={setIsEditing}

          setShowModal={setShowModal}

          fetchEmployers={fetchEmployers}

        />

      )}

      {/* Delete */}

      <DeleteEmployerModal

        open={!!deleteEmployerId}

        onClose={() =>
          setDeleteEmployerId(null)
        }

        onConfirm={handleDelete}

      />

    </AdminLayout>

  );

};

export default EmployerManagement;