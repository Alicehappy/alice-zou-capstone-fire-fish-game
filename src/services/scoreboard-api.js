import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

const VITE_API_URL = `${API_URL}:${PORT}`;


export const fetchSores = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/scoreboard`);
  return data;
};

export const saveScore = async (scoreData) => {
  const { data } = await axios.post(
    `${VITE_API_URL}/api/scoreboard`,
    scoreData
  );
  return data;
};
