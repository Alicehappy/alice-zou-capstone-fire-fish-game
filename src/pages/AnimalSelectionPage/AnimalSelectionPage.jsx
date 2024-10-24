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
  underwater: "/images/underwater.webp",
  wild: "/images/wild.webp",
  birds: "/images/birds.webp",
  insects: "/images/insects.webp",
  farm: "/images/farm.webp",
};

function AnimalSelectionPage() {
  const [categoriesWithAnimals, setCategoriesWithAnimals] = useState([]);
  const [error, setError] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const navigate = useNavigate();

  const getSelectionLimit = () => {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 5;
  };

  const selectionLimit = getSelectionLimit();

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

  const handleAnimalSelect = (animal) => {
    if (selectedAnimals.length < selectionLimit) {
      setSelectedAnimals([...selectedAnimals, animal]);
    }
  };

  const handleCreateStory = () => {
    navigate("/story", { state: { animals: selectedAnimals } });
  };

  if (error) return <Error error={error} />;

  return (
    <div className="animal-selection">
      <h1 className="animal-selection__title">
        Welcome to Animal Selection Game
      </h1>
      <h3 className="animal-selection__subtitle">Select Your Animal(s)</h3>

      {/* {selectedAnimal && (
        <div className="animal-card">
          <img
            src={`${API_URL}:${PORT}${selectedAnimal.image_url}`}
            alt={selectedAnimal.name}
            className="animal-card__image"
          />
          <p className="animal-card__name">{selectedAnimal.name}</p>
        </div>
      )} */}

      {/* Render dropdowns for each category */}
      <div className="animal-cards-container">
        {categoriesWithAnimals.map((category) => (
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
              {selectedAnimals[category.id] && (
                <p className="animal-card__name">
                  {selectedAnimals[category.id].name}
                </p>
              )}
            </div>

            <DropdownComponent
              options={category.animals.map((animal) => ({
                label: animal.name,
                value: animal,
                key: animal.id,
              }))}
              onSelect={(value) => handleAnimalSelect(value, category.id)}
              placeholder={`Select a ${category.name} animal`}
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
