import AdminLayout from "../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { getDashboardStats } from "../services/adminService";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({
      totalHRs: 0,
      totalCandidates: 0,
      totalJobs: 0,
    });


  useEffect(() => {

  const fetchStats =
    async () => {

      const data =
        await getDashboardStats();

      setStats(data);
    };

  fetchStats();

}, []);

  return (
    <AdminLayout>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage HR accounts and platform settings
        </p>

      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-2xl border">
          <h3>Total HRs</h3>
          <h1 className="text-4xl font-bold mt-2">
            {stats.totalHRs}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <h3>Total Candidates</h3>
          <h1 className="text-4xl font-bold mt-2">
            {stats.totalCandidates}
          </h1>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <h3>Total Jobs</h3>
          <h1 className="text-4xl font-bold mt-2">
            {stats.totalJobs}
          </h1>
        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;