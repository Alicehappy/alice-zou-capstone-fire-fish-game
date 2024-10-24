import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

export const fetchUserStories = async (user_id) => {
  const { data } = await axios.get(`${API_URL}:${PORT}/api/stories/${user_id}`);
  return data;
};

export const saveStory = async (storyData) => {
  const { data } = await axios.post(
    `${API_URL}:${PORT}/api/stories`,
    storyData
  );
  return data;
};
