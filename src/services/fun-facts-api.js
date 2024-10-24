import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

export const fetchFunFacts = async (animalId) => {
  const { data } = await axios.get(
    `${API_URL}:${PORT}/api/fun-facts/${animalId}`
  );
  return data;
};

export const saveFunFact = async (funFactData) => {
  const { data } = await axios.post(
    `${API_URL}:${PORT}/api/fun-facts`,
    funFactData
  );
  return data;
};
