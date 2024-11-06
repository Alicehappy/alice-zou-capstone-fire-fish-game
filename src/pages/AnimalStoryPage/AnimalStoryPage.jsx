import "./AnimalStoryPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFunFacts, saveFunFact } from "../../services/fun-facts-api";
import { fetchUserStories, saveStory } from "../../services/stories-api";
import Error from "../../components/Error/Error";
import Button from "../../components/Button/Button";

const VITE_API_URL = import.meta.env.VITE_API_URL;

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
        const factsArray = await Promise.all(
          animals.map(async (animal) => {
            try {
              const data = await fetchFunFacts(animal.id);
              if (Array.isArray(data) && data.length > 0) {
                return {
                  name: animal.name,
                  facts: data.map((fact) => fact.fact),
                };
              } else {
                console.warn(
                  `Unexpected data format or no fun facts for ${animal.name}.`
                );
                return {
                  name: animal.name,
                  facts: ["No fun facts available."],
                };
              }
            } catch (err) {
              if (err.response && err.response.status === 404) {
                console.warn(`No fun facts found for ${animal.name}.`);
                return {
                  name: animal.name,
                  facts: ["No fun facts available."],
                };
              }
              throw err;
            }
          })
        );

        const facts = factsArray.reduce((acc, { name, facts }) => {
          acc[name] = facts;
          return acc;
        }, {});

        setFunFacts(facts);
        console.log(facts);
      } catch (err) {
        console.error("Error fetching fun facts:", err);
        setError("Failed to load fun facts.");
      }
    };

    loadFunFacts();
  }, [animals]);

  const loadStories = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
    try {
      const data = await fetchUserStories(user_id);
      setStories(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      console.error("Error fetching stories:", err);
      setError("Failed to load stories.");
      return [];
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleSaveStory = async () => {
    try {
      const storyData = {
        user_name: localStorage.getItem("username"),
        story_text: storyText,
      };

      await saveStory(storyData);
      setStoryText("");
      alert("Story saved successfully!");

      await loadStories();
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
              src={`${VITE_API_URL}${animal.image_url}`}
              alt={animal.name}
              className="animal-card__image"
            />
            <h2 className="animal-card__name">{animal.name}</h2>

            {(
              <p className="animal-card__fun-fact">{funFacts[animal.name]}</p>
            ) || (
              <ul className="animal-card__fun-facts">
                {[]?.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            )}
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
        {stories && stories.length > 0 ? (
          <ul className="story-page__stories-list">
            {stories.map((story, index) => (
              <li
                key={story.id}
                className={`story-page__story-item story-color-${index % 4}`}
              >
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
