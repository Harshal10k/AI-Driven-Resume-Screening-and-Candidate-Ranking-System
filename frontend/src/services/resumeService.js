import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/resumes`;

// ==========================
// Authorization Config
// ==========================

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  };

};

// ==========================
// Error Handler
// ==========================

const handleApiError = (error) => {

  console.error(
    "Resume API Error:",
    error
  );

  throw error;

};

// ==========================
// Upload Resumes
// ==========================

export const uploadResumes = async (
  jobId,
  files
) => {

  try {

    const formData =
      new FormData();

    Array.from(files).forEach(
      (file) => {

        formData.append(
          "resumes",
          file
        );

      }
    );

    const config =
      getAuthConfig();

    const response =
      await axios.post(

        `${API_URL}/upload/${jobId}`,

        formData,

        {

          ...config,

          headers: {

            ...config.headers,

            "Content-Type":
              "multipart/form-data",

          },

        }

      );

    return response.data;

  } catch (error) {

    handleApiError(error);

  }

};

// ==========================
// Get Resumes By Job
// ==========================

export const getResumesByJob =
  async (jobId) => {

    try {

      const response =
        await axios.get(

          `${API_URL}/${jobId}`,

          getAuthConfig()

        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Get All Resumes
// ==========================

export const getAllResumes = async () => {
  try {
    const response =
      await axios.get(
        API_URL,
        getAuthConfig()
      );
    return response.data;
  }
  catch (error) {
    handleApiError(error);
  }
};

// ==========================
// Update Candidate Status
// ==========================

export const updateCandidateStatus =
  async (
    resumeId,
    status
  ) => {

    try {

      const response =
        await axios.patch(

          `${API_URL}/${resumeId}/status`,

          {

            status,

          },

          getAuthConfig()

        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Export Shortlisted Candidates
// ==========================

export const exportShortlist =
  async (jobId) => {

    try {

      const response =
        await axios.get(

          `${API_URL}/export/${jobId}`,

          {

            ...getAuthConfig(),

            responseType: "blob",

          }

        );

      const blob = new Blob(
        [response.data],
        {
          type: "text/csv",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "shortlisted_candidates.csv";

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        url
      );

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Re-run AI Screening
// ==========================

export const rerunAIScreening = async (jobId) => {

  try {

    const response = await axios.post(

      `${API_URL}/rescreen/${jobId}`,

      {},

      getAuthConfig()

    );

    return response.data;

  }

  catch (error) {

    handleApiError(error);

  }

};

/*
==================================================

Future APIs

==================================================

// Export Shortlisted Candidates

export const exportShortlisted =
async (jobId) => {

};

// Download Resume

export const downloadResume =
async (resumeId) => {

};

*/
