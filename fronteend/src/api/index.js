// src/api/index.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const login = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
  return response.data;
};

// Add more API functions as needed
