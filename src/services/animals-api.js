import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchAnimals = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/categories`);
  return data;
};

export const fetchRandomAnimal = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/random-animal`);
  return data;
};
