import axios from "axios";

const baseUrl = "http://localhost:3000/v1";

export const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users/get-all-users`);
  return response?.data?.result || response?.data?.data || response?.data;
};

export const createNewUser = async (userData) => {
  const response = await axios.post(`${baseUrl}/users/create-user`, userData);
  return response?.data;
};
