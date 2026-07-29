import {
  Users,
  ShieldCheck,
  BrainCircuit,
  Flag,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({
  totalApplicants,
  shortlisted,
  averageScore,
  biasFlags,
}) => {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Applicants"
        value={totalApplicants}
        subtitle="Total Candidates"
        icon={Users}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        borderColor="border-blue-200"
      />

      <StatCard
        title="Shortlisted"
        value={shortlisted}
        subtitle="Qualified"
        icon={ShieldCheck}
        iconBg="bg-green-100"
        iconColor="text-green-600"
        borderColor="border-green-200"
      />

      <StatCard
        title="AI Score"
        value={`${averageScore}%`}
        subtitle="Average Match"
        icon={BrainCircuit}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        borderColor="border-amber-200"
      />

      <StatCard
        title="Bias Flags"
        value={biasFlags}
        subtitle="Detected"
        icon={Flag}
        iconBg="bg-red-100"
        iconColor="text-red-600"
        borderColor="border-red-200"
      />

    </section>
  );
};

export default StatsGrid;