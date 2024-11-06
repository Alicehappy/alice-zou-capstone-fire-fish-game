import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userName) => {
  const { data } = await axios.post(`${VITE_API_URL}/api/users`, {
    name: userName,
  });
  return data.user_id;
};
