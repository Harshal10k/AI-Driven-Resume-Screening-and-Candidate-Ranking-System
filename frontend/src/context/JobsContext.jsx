import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useAuth } from "./AuthContext";
import { getJobs } from "../services/jobService";

const JobsContext = createContext();

const ALL_JOBS = {
  _id: "all",
  title: "All Jobs",
};

export const JobsProvider = ({ children }) => {
  const { token, loading: authLoading } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] =
    useState(ALL_JOBS);

  const [loading, setLoading] =
    useState(false);

  const [showClosedJobs, setShowClosedJobs] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    if (showClosedJobs) {
      return job.status === "closed";
    }

    return job.status === "open";
  });

  useEffect(() => {
    if (selectedJob?._id === "all") return;

    if (!selectedJob) return;

    const exists = filteredJobs.find(
      (job) => job._id === selectedJob._id
    );

    if (!exists) {
      setSelectedJob(ALL_JOBS);
    }
  }, [filteredJobs, selectedJob]);

  // ==========================
  // Fetch Jobs
  // ==========================

  const fetchJobs = useCallback(

    async (
      autoSelectNewest = false
    ) => {

      if (!token) return;

      try {

        setLoading(true);

        const response =
          await getJobs();

        if (!response.success) {

          setJobs([]);
          setSelectedJob(null);

          return;

        }

        const newJobs =
          response.data || [];

        setJobs(newJobs);

        // keep current selection if possible
        setSelectedJob((prev) => {
          if (!prev) return ALL_JOBS;

          if (prev._id === "all") return ALL_JOBS;

          const exists = newJobs.find(
            (job) => job._id === prev._id
          );

          return exists || ALL_JOBS;
        });

        // ==========================
        // Auto select newly created job
        // ==========================

        if (
          autoSelectNewest &&
          newJobs.length
        ) {

          setSelectedJob(
            newJobs[0]
          );

          return;

        }

      } catch (error) {

        console.error(
          "Failed to fetch jobs:",
          error
        );

        setJobs([]);

      } finally {

        setLoading(false);

      }

    },

    [token]

  );

  // ==========================
  // Fetch After Login
  // ==========================

  useEffect(() => {

    if (authLoading) return;

    if (!token) {

      setJobs([]);

      setSelectedJob(null);

      return;

    }

    fetchJobs();

  }, [
    authLoading,
    token,
    fetchJobs,
  ]);

  // ==========================
  // Select Job
  // ==========================

  const selectJob = useCallback((job) => {
    if (!job) {
      setSelectedJob(ALL_JOBS);
      return;
    }

    setSelectedJob(job);
  }, []);

  const toggleClosedJobs = () => {
    setShowClosedJobs((prev) => !prev);

    setSelectedJob(ALL_JOBS);
  };

  // ==========================
  // Clear Selection
  // ==========================

  const clearSelectedJob =
    useCallback(() => {

      setSelectedJob(ALL_JOBS);

    }, []);

  return (

    <JobsContext.Provider
      value={{
        jobs,

        filteredJobs,

        loading,

        selectedJob,

        setSelectedJob: selectJob,

        clearSelectedJob,

        fetchJobs,

        ALL_JOBS,

        showClosedJobs,

        setShowClosedJobs,
        toggleClosedJobs,
      }}
    >

      {children}

    </JobsContext.Provider>

  );

};

export const useJobs = () =>
  useContext(JobsContext);