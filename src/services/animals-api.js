import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

export const fetchAnimals = async () => {
  const { data } = await axios.get(`${API_URL}:${PORT}/api/categories`);
  return data;
};

export const fetchRandomAnimal = async () => {
  const { data } = await axios.get(`${API_URL}:${PORT}/api/random-animal`);
  return data;
};
