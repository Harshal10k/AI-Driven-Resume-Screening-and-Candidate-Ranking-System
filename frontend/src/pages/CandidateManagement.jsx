import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import CandidateToolbar from "../components/admin/CandidateToolbar";
import CandidateStats from "../components/admin/CandidateStats";
import CandidateCard from "../components/admin/CandidateCard";
import CandidateDetailsDrawer from "../components/admin/CandidateDetailsDrawer";

import { getCandidates } from "../services/adminService";

import { Search } from "lucide-react";

const CandidateManagement = () => {

  const [candidates, setCandidates] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {

    fetchCandidates();

  }, []);

  const fetchCandidates = async () => {

    try {

      const response = await getCandidates();

      if (response.success) {

        setCandidates(response.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const filteredCandidates = candidates.filter((candidate) => {
    return (
      candidate.name?.toLowerCase().includes(search.toLowerCase()) ||
      candidate.email?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Hero */}
        <CandidateToolbar totalCandidates={candidates.length} />

        {/* Stats */}
        <CandidateStats candidates={candidates} />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="space-y-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              onView={() => {
                setSelectedCandidate(candidate);
                setShowDrawer(true);
              }}
            />
          ))}
        </div>

        {/* Drawer */}
        <CandidateDetailsDrawer
          open={showDrawer}
          candidate={selectedCandidate}
          onClose={() => setShowDrawer(false)}
        />

      </div>
    </AdminLayout>
  );

};

export default CandidateManagement;