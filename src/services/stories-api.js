import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

const VITE_API_URL = `${API_URL}:${PORT}`;


export const fetchUserStories = async (user_id) => {
  const { data } = await axios.get(`${VITE_API_URL}/api/stories/${user_id}`);
  return data;
};

export const saveStory = async (storyData) => {
  const { data } = await axios.post(
    `${VITE_API_URL}/api/stories`,
    storyData
  );
  return data;
};
