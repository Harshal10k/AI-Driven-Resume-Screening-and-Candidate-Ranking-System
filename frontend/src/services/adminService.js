import axios from "axios";

const API_URL =
  "http://localhost:5000/api/admin";

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  };

};

// Create Employer

export const createEmployer =
  async (employerData) => {

    const response =
      await axios.post(
        `${API_URL}/create-employer`,
        employerData,
        getAuthConfig()
      );

    return response.data;

  };

// Get All Employers

export const getEmployers =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/employers`,
        getAuthConfig()
      );

    return response.data;

  };

// Dashboard Statistics

export const getDashboardStats =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard-stats`,
        getAuthConfig()
      );

    return response.data;

  };

// Delete Employer

export const deleteEmployer =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/employers/${id}`,
        getAuthConfig()
      );

    return response.data;

  };

// Update Employer

export const updateEmployer = async (id, data) => {

  const response = await axios.put(
    `${API_URL}/employers/${id}`,
    data,
    getAuthConfig()
  );

  return response.data;

};

// Get All Candidates
export const getCandidates = async () => {

  const response = await axios.get(
    `${API_URL}/candidates`,
    getAuthConfig()
  );

  return response.data;

};