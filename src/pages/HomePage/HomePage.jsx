import "./HomePage.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faPaw } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/typing-game");
    console.log("Start Game clicked!");
  };

  return (
    <div className="home">
      <h1 className="home__title">Welcome to FireFish Game</h1>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <Button className="home__button--typing-game" onClick={handleStart} variant="primary">
        <FontAwesomeIcon icon={faFish} />
        Start the Typing Game
      </Button>

      <Button onClick={handleStart} variant="primary">
        <FontAwesomeIcon icon={faPaw} />
        Start the Animal Selection Game
      </Button>
    </div>
  );
}

export default HomePage;
