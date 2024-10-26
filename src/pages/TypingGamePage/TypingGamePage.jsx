import { useState, useEffect } from "react";
import FireFish from "../../components/FireFish/FireFish";
import { useNavigate } from "react-router-dom";
import { fetchRandomAnimal } from "../../services/animals-api";
import "./TypingGamePage.scss";
import Bubble from "../../components/Bubble/Bubble";
import CoralReef from "../../components/CoralReef/CoralReef";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_PORT;

function TypingGamePage() {
  const [score, setScore] = useState(0);
  const [fishArray, setFishArray] = useState([]);
  const [animal, setAnimal] = useState("dolphin");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [bubbles, setBubbles] = useState([]);

  const bucketPosition = {
    x: window.innerWidth * 0.65,
    y: window.innerHeight - 80,
  };

  const addBubbles = (count) => {
    const newBubbles = Array.from({ length: count }, () => (
      <Bubble key={Math.random()} />
    ));
    setBubbles((prev) => [...prev, ...newBubbles]);
  };

  useEffect(() => {
    addBubbles(10);

    const bubbleInterval = setInterval(() => {
      addBubbles(10);
    }, 1000);

    return () => clearInterval(bubbleInterval);
  }, [navigate]);

  useEffect(() => {
    const loadAnimalWord = async () => {
      try {
        const animal = await fetchRandomAnimal();
        setAnimal(animal);

        const lettersArray = animal.name.split("").map((char, index) => ({
          char,
          id: index,
        }));

        setFishArray(lettersArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animal word:", error);
      }
    };
    loadAnimalWord();
  }, []);

  const handleLetterCaught = (id) => {
    setScore((prevScore) => prevScore + 10);
    setFishArray((prevFishArray) =>
      prevFishArray.filter((letter) => letter.id !== id)
    );
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      localStorage.setItem("score", score);
      navigate("/submit-score");
    }
  }, [timer, score, navigate]);

  useEffect(() => {
    if (fishArray.length === 0 && !loading) {
      localStorage.setItem("score", score);
      navigate("/submit-score");
    }
  }, [fishArray, score, navigate]);

  if (loading) {
    return <>Loading....;</>;
  }

  return (
    <>
      <div
        className="game"
        style={{ "--bg-url": `url(${API_URL}:${PORT}/images/coral_reef.webp)` }}
      >
        <h1 className="game__detail game__detail--score">Score: {score}</h1>
        <h2 className="game__detail game__detail--timing">
          Time Remaining: {timer}s{" "}
        </h2>
        <h2 className="game__detail game__detail--word">
          Animal Word: {animal.name}{" "}
        </h2>
        <div className="bucket">🪣</div>
        {fishArray.map((fish, index) => {
          return (
            <FireFish
              key={fish.id}
              index={index}
              letter={fish.char}
              onLetterCaught={() => handleLetterCaught(fish.id)}
              bucketPosition={bucketPosition}
            />
          );
        })}
          <CoralReef className="game__coral" />
          {bubbles}
      </div>
    </>
  );
}

export default TypingGamePage;
