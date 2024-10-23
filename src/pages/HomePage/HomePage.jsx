import "./HomePage.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faPaw } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStart = (event) => {
    event.preventDefault();

    if (!username) {
      setError("Please enter your username");
      return;
    }

    localStorage.setItem("username", username);

    navigate("/typing-game");
  };

  const handleOnStartAnimalGame = (event) => {
    event.preventDefault();
    navigate("/animal-selection");
  };

  return (
    <div className="home">
      <h1 className="home__title">Welcome to FireFish Game</h1>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
      />

      <Button
        className="home__button--typing-game"
        onClick={handleStart}
        variant="primary"
      >
        <FontAwesomeIcon icon={faFish} />
        &nbsp; Start the Typing Game
      </Button>

      <Button onClick={handleOnStartAnimalGame} variant="primary">
        <FontAwesomeIcon icon={faPaw} />
        &nbsp; Start the Animal Selection Game
      </Button>
    </div>
  );
}

export default HomePage;
