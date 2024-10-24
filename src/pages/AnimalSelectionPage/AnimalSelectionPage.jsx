import "./AnimalSelectionPage.scss";
import { useState, useEffect } from "react";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { fetchAnimals } from "../../services/animals-api";
import Error from "../../components/Error/Error";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

function AnimalSelectionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [categoriesWithAnimals, setCategoriesWithAnimals] = useState([]);
  const [error, setError] = useState("");

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

  if (error) return <Error error={error} />;

  const handleOnSelectedAnimal = (animal) => {
    console.log(animal);
    setSelectedAnimal(animal);
    console.log(`Selected animal: ${animal.name}`);
  };

  const handleOnCreateStory = () => {
    console.log("Create story clicked");
  };

  return (
    <div className="animal-selection">
      <h1 className="animal-selection__title">
        Welcome to Animal Selection Game
      </h1>

      {selectedAnimal && (
        <div className="animal-card">
          <img
            src={`${API_URL}:${PORT}${selectedAnimal.image_url}`}
            alt={selectedAnimal.name}
            className="animal-card__image"
          />
          <p className="animal-card__name">{selectedAnimal.name}</p>
        </div>
      )}

      {/* Render dropdowns for each category */}
      {categoriesWithAnimals.map((category) => (
        <div key={category.id} className="animal-dropdown">
          <h2 className="animal-dropdown__title">{category.name}</h2>
          <DropdownComponent
            options={category.animals.map((animal) => ({
              label: animal.name,
              value: animal,
              key: animal.id,
            }))}
            onSelect={(value) => handleOnSelectedAnimal(value)}
            placeholder={`Select a ${category.name} animal`}
          />
        </div>
      ))}

      <Button variant="primary">Create Story</Button>
    </div>
  );
}

export default AnimalSelectionPage;
