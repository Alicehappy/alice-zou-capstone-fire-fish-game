import "./AnimalSelectionPage.scss";
import { useState } from "react";
import DropdownComponent from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";

function AnimalSelectionPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const animalOptions = ["Dolphpin", "Lion", "Eagle"];

  const handleOnSelectedAnimal = () => {
    consolelog("you have selected some animals");
  };

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
      <Button onClick={handleOnSelectedAnimal} variant="primary">
        Create Story
      </Button>
    </div>
  );
}

export default AnimalSelectionPage;
