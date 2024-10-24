import "./AnimalStoryPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFunFacts, saveFunFact } from "../../services/fun-facts-api";
import { fetchUserStories, saveStory } from "../../services/stories-api";
import Error from "../../components/Error/Error";
import Button from "../../components/Button/Button";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

function AnimalStoryPage() {
  const { state } = useLocation();
  const { animals = [] } = state || {};
  const [funFacts, setFunFacts] = useState({});
  const [storyText, setStoryText] = useState("");
  const [stories, setStories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadFunFacts = async () => {
      try {
        const facts = {};
        for (const animal of animals) {
          const data = await fetchFunFacts(animal.id);
          facts[animal.name] = data.map((fact) => fact.fact);
        }
        setFunFacts(facts);
      } catch (err) {
        console.error("Error fetching fun facts:", err);
        setError("Failed to load fun facts.");
      }
    };
    loadFunFacts();
  }, [animals]);

  useEffect(() => {
    const loadStories = async (user_id) => {
      try {
        const { data } = await fetchUserStories(user_id);
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories.");
      }
    };
    loadStories();
  }, []);

  const handleSaveStory = async () => {
    try {
      const storyData = {
        user_name: localStorage.getItem("username"), // Get current user's ID from local storage
        story_text: storyText,
      };
      await saveFunFact(storyData);
      setStoryText("");
      alert("Story saved successfully!");
    } catch (err) {
      console.error("Error saving story:", err);
      setError("Failed to save story.");
    }
  };

  if (error) return <Error error={error} />;

  return (
    <div className="story-page">
      <h1 className="story-page__title">Create Your Story</h1>

      <div className="animal-cards">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-card">
            <img
              src={`${API_URL}:${PORT}${animal.image_url}`}
              alt={animal.name}
              className="animal-card__image"
            />
            <h2 className="animal-card__name">{animal.name}</h2>
            <ul className="animal-card__fun-facts">
              {funFacts[animal.name]?.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <textarea
        value={storyText}
        onChange={(e) => setStoryText(e.target.value)}
        placeholder="Write your story here..."
        className="story-page__input"
      ></textarea>

      <div className="story-page__actions">
        <Button onClick={handleSaveStory} variant="primary">
          Save Story
        </Button>
        <Button onClick={() => navigate("/")} variant="secondary">
          Go Back
        </Button>
      </div>

      <div className="story-page__existing-stories">
        <h2>My Stories</h2>
        {stories.length > 0 ? (
          <ul className="story-page__stories-list">
            {stories.map((story) => (
              <li key={story.id} className="story-page__story-item">
                <p>{story.story_text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stories found.</p>
        )}
      </div>
    </div>
  );
}

export default AnimalStoryPage;
