import { createContext, useContext, useState } from "react";

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior ML Engineer",
      department: "AI Team",
      applicants: 48,
      shortlisted: 12,
      status: "Active",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product Team",
      applicants: 31,
      shortlisted: 8,
      status: "Active",
    },
    {
      id: 3,
      title: "Data Analyst",
      department: "Analytics Team",
      applicants: 19,
      shortlisted: 4,
      status: "Active",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState("All Jobs");

  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
        selectedJob,
        setSelectedJob,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);