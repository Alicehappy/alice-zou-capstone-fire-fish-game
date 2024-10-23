import "./AnimalSelectionPage.scss";
import { useState } from "react";
import DropdownComponent from "../../components/Dropdown/Dropdown";

function AnimalSelectionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const animalOptions = ["Dolphpin", "Lion", "Eagle"];

  return (
    <div className="animal-selection">
      <h1 className="animal-selection__title">
        Welcome to Animal Selection Game
      </h1>
      <DropdownComponent
        options={animalOptions}
        onSelect={(e) => setSelectedAnimal(e.value)}
        placeholder="Select an animal"
      />
      <button className="animal-selection__button">Start Game</button>
    </div>
  );
}

export default AnimalSelectionPage;
