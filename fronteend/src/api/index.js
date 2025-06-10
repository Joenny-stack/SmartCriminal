// src/api/index.js
import axios from "axios";

const API_BASE_URL = "http://10.40.17.125:5000/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

// Add more API functions as needed
