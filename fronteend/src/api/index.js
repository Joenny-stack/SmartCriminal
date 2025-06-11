// src/api/index.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

// Add more API functions as needed
