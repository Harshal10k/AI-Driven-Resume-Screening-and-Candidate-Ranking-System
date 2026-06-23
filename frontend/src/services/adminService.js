import axios from "axios";

const API_URL =
  "http://localhost:5000/api/admin";

export const createHR = async (
  hrData
) => {

  const response =
    await axios.post(
      `${API_URL}/create-hr`,
      hrData
    );

  return response.data;
};

export const getHRs = async () => {

  const response =
    await axios.get(
      `${API_URL}/hrs`
    );

  return response.data;
};

export const getDashboardStats =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/dashboard-stats`
      );

    return response.data;
};

export const deleteHr = async (
  id
) => {

  return axios.delete(
    `${API_URL}/hrs/${id}`
  );

};