import axios from "axios";


const VITE_API_URL = import.meta.env.VITE_API_URL;


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
