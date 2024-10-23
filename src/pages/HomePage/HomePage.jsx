import "./HomePage.scss";
import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

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
      <Button onClick={handleStart} variant="primary">
        Start Game
      </Button>

      <Button onClick={handleStart} variant="secondary">
        Learn More
      </Button>
    </div>
  );
}

export default HomePage;
