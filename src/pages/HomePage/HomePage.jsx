import "./HomePage.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish, faPaw } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/user-api";

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
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
      />

      <Button
        className="home__button--typing-game"
        onClick={() => handleGameStart("typing")}
        variant="primary"
      >
        <FontAwesomeIcon icon={faFish} />
        &nbsp; Start Typing Game
      </Button>

      <Button onClick={() => handleGameStart("animal")} variant="primary">
        <FontAwesomeIcon icon={faPaw} />
        &nbsp; Start Animal Selection Game
      </Button>
    </div>
  );
}

export default HomePage;
