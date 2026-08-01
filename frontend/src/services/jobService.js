import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/jobs`;

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
    "Job API Error:",
    error
  );

  throw error;

};

// ==========================
// Get Employer Jobs
// ==========================

export const getJobs = async () => {

  try {

    const response =
      await axios.get(
        API_URL,
        getAuthConfig()
      );

    return response.data;

  } catch (error) {

    handleApiError(error);

  }

};

// ==========================
// Get All Open Jobs
// ==========================

export const getOpenJobs =
  async () => {

    try {

      const response =
        await axios.get(
          `${API_URL}/open`,
          getAuthConfig()
        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Get Single Job
// ==========================

export const getJobById =
  async (id) => {

    try {

      const response =
        await axios.get(
          `${API_URL}/${id}`,
          getAuthConfig()
        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Create Job
// ==========================

export const createJob =
  async (jobData) => {

    try {

      const response =
        await axios.post(
          API_URL,
          jobData,
          getAuthConfig()
        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Update Job
// ==========================

export const updateJob =
  async (
    id,
    jobData
  ) => {

    try {

      const response =
        await axios.put(

          `${API_URL}/${id}`,

          jobData,

          getAuthConfig()

        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Update Job Status
// ==========================

export const updateJobStatus =
  async (
    id,
    status
  ) => {

    try {

      const response =
        await axios.patch(

          `${API_URL}/${id}/status`,

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
// Delete Job
// ==========================

export const deleteJob =
  async (id) => {

    try {

      const response =
        await axios.delete(

          `${API_URL}/${id}`,

          getAuthConfig()

        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };

// ==========================
// Duplicate Job
// ==========================

export const duplicateJob =
  async (job) => {

    try {

      const duplicatedJob = {

        ...job,

        title:
          `${job.title} (Copy)`,

      };

      delete duplicatedJob._id;
      delete duplicatedJob.createdAt;
      delete duplicatedJob.updatedAt;
      delete duplicatedJob.summary;
      delete duplicatedJob.__v;

      const response =
        await axios.post(

          API_URL,

          duplicatedJob,

          getAuthConfig()

        );

      return response.data;

    } catch (error) {

      handleApiError(error);

    }

  };