import axios from "axios";



const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

const VITE_API_URL = `${API_URL}:${PORT}`;

export const fetchAnimals = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/categories`);
  return data;
};

export const fetchRandomAnimal = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/random-animal`);
  return data;
};
