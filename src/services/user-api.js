import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

const VITE_API_URL = `${API_URL}:${PORT}`;


export const registerUser = async (userName) => {
  const { data } = await axios.post(`${VITE_API_URL}/api/users`, {
    name: userName,
  });
  return data.user_id;
};
