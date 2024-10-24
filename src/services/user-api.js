import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

export const registerUser = async (userName) => {
  const { data } = await axios.post(`${API_URL}:${PORT}/api/users`, {
    name: userName,
  });
  return data.user_id;
};
