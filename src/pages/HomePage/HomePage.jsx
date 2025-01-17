import "./HomePage.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faPaw } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/user-api";
import FishBubbleGame from "../../components/FishBubbleGame/FishBubbleGame";

function HomePage() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGameStart = async (gameType) => {
    try {
      const user_id = await registerUser(username);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("username", username);

      if (gameType === "typing") {
        navigate("/typing-game");
      } else if (gameType === "animal") {
        navigate("/animal-selection");
      }
    } catch (error) {
      console.error("Error registering user: ", error);
      alert("Failed to register user.");
    }
  };

  return (
    <div className="home">
      <h1 className="home__title">Welcome to FireFish Game</h1>
      <Input
        className="home__input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
      />
      <div className="home__actions">
      <Button
        className="home__button--typing-game"
        onClick={() => handleGameStart("typing")}
        variant="primary"
      >
        <FontAwesomeIcon icon={faFish} />
        &nbsp; Start Typing Game
      </Button>

      <Button
        className="home__button--animal-selection"
        onClick={() => handleGameStart("animal")}
        variant="primary"
      >
        <FontAwesomeIcon icon={faPaw} />
        &nbsp; Start Animal Selection Game
      </Button>
      </div>
      <h2 className="fish-bubble-title">
        Click to make the fish pop the bubble!
      </h2>
      <FishBubbleGame className="fish-bubble-game" />
    </div>
  );
}

export default HomePage;
