import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

export const fetchSores = async () => {
  const { data } = await axios.get(`${API_URL}:${PORT}/api/scoreboard`);
  return data;
};

export const saveScore = async () => {
    const { data } = await axios.post(`${API_URL}:${PORT}/api/scoreboard`);
    return data;
  };
