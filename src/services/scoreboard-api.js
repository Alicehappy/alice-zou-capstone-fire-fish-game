import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;


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
