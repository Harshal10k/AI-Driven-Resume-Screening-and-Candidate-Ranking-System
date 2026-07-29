import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  uploadResumes,
  getResumesByJob,
  getAllResumes,
  updateCandidateStatus,
  exportShortlist,
  rerunAIScreening,
} from "../services/resumeService";

import { useJobs } from "./JobsContext";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchJobs } = useJobs();

  // ==========================
  // Fetch Resumes
  // ==========================

  const fetchResumes = useCallback(async (jobId) => {
    if (!jobId) {
      setResumes([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response =
        jobId === "all"
          ? await getAllResumes()
          : await getResumesByJob(jobId);

      if (response.success) {
        setResumes(response.data);
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch resumes."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================
  // Upload Resumes
  // ==========================

  const uploadFiles = async (jobId, files) => {
    try {
      setLoading(true);
      setError(null);

      const response = await uploadResumes(jobId, files);

      await fetchResumes(jobId);

      return response;
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Resume upload failed."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Update Candidate Status
  // ==========================

  const updateStatus = async (
    resumeId,
    status,
    jobId
  ) => {
    try {
      setLoading(true);
      setError(null);

      await updateCandidateStatus(
        resumeId,
        status
      );

      await fetchResumes(jobId);
      await fetchJobs();
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update candidate."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Export Shortlist
  // ==========================

  const exportCandidates = async (jobId) => {
    try {
      await exportShortlist(jobId);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to export candidates."
      );
    }
  };

  // ==========================
// Re-run AI Screening
// ==========================

  const rerunAI = async (jobId) => {

    try {
      setLoading(true);
      setError(null);
      const response =
        await rerunAIScreening(jobId);
      await fetchResumes(jobId);
      await fetchJobs();
      return response;
    }
    catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to rerun AI screening."
      );
    }
    finally {
      setLoading(false);
    }
  };

  // ==========================
  // Clear
  // ==========================

  const clearResumes = () => {
    setResumes([]);
    setError(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        loading,
        error,
        fetchResumes,
        uploadFiles,
        updateStatus,
        exportCandidates,
        rerunAI,
        clearResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumes = () =>
  useContext(ResumeContext);