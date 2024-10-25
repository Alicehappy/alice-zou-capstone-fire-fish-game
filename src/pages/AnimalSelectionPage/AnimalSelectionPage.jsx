import "./AnimalSelectionPage.scss";
import { useState, useEffect } from "react";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { fetchAnimals } from "../../services/animals-api";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

const placeholders = {
  underwater: `${API_URL}:${PORT}/images/underwater.webp`,
  wild: `${API_URL}:${PORT}/images/wild.webp`,
  birds: `${API_URL}:${PORT}/images/birds.webp`,
  insects: `${API_URL}:${PORT}/images/insects.webp`,
  farm: `${API_URL}:${PORT}/images/farm.webp`,
};

function AnimalSelectionPage() {
  const [categoriesWithAnimals, setCategoriesWithAnimals] = useState([]);
  const [error, setError] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const navigate = useNavigate();

  const getSelectionLimit = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1280) return 2;
    return 5;
  };

  const [selectionLimit, setSelectionLimit] = useState(getSelectionLimit());

  useEffect(() => {
    const handleResize = () => setSelectionLimit(getSelectionLimit());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadCategoriesWithAnimals = async () => {
      try {
        const data = await fetchAnimals();
        setCategoriesWithAnimals(data);
        console.log("animals with categories");
        console.log(data);
      } catch (err) {
        console.error("Error fetching categories: ", err);
        setError("Failed to fetch categories");
      }
    };
    loadCategoriesWithAnimals();
  }, []);

  const handleAnimalSelect = (animal, categoryId) => {
    setSelectedAnimals((prev) => {
      const updated = { ...prev, [categoryId]: animal };
      console.log("Updated selectedAnimals: ", updated);
      return updated;
    });
  };

  const handleCreateStory = () => {
    const animals = Object.values(selectedAnimals);
    console.log("Animals on clicking Create Story button: ", animals);
    navigate("/story", { state: { animals: animals } });
  };

  if (error) return <Error error={error} />;

  return (
    <div className="animal-selection">
      <h1 className="animal-selection__title">
        Welcome to Animal Selection Game
      </h1>
      <h3 className="animal-selection__subtitle">Select Your Animal(s)</h3>

      <div className="animal-cards-container">
        {categoriesWithAnimals.slice(0, selectionLimit).map((category) => (
          <div key={category.id} className="animal-dropdown">
            <h2 className="animal-dropdown__title">{category.name}</h2>
            <div className="animal-card">
              <img
                src={
                  selectedAnimals[category.id]
                    ? `${API_URL}:${PORT}${
                        selectedAnimals[category.id].image_url
                      }`
                    : placeholders[category.name.toLowerCase()]
                }
                alt={
                  selectedAnimals[category.id]
                    ? selectedAnimals[category.id].name
                    : "Placeholder"
                }
                className="animal-card__image"
              />
              {/* {selectedAnimals[category.id] && (
                  <p className="animal-card__name">
                    {selectedAnimals[category.id].name}
                  </p>
                )} */}
            </div>

            <DropdownComponent
              options={category.animals.map((animal) => ({
                label: animal.name,
                value: animal,
                key: animal.id,
              }))}
              onSelect={(value) => handleAnimalSelect(value, category.id)}
              placeholder={`Select an animal`}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleCreateStory} variant="primary">
        Create Story
      </Button>
    </div>
  );
}

export default AnimalSelectionPage;
