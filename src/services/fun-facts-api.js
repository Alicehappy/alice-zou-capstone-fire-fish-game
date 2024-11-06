import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchFunFacts = async (animalId) => {
  const { data } = await axios.get(
    `${VITE_API_URL}/api/fun-facts/${animalId}`
  );
  return data;
};

export const saveFunFact = async (funFactData) => {
  const { data } = await axios.post(
    `${VITE_API_URL}/api/fun-facts`,
    funFactData
  );
  return data;
};
