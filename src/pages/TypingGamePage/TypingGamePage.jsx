import { useState, useEffect } from "react";
import FireFish from "../../components/FireFish/FireFish";
import { useNavigate } from "react-router-dom";
import { fetchRandomAnimal } from "../../services/animals-api";
import "./TypingGamePage.scss";

function TypingGamePage() {
  const [score, setScore] = useState(0);
  const [fishArray, setFishArray] = useState(["c", "a", "t"]);
  const [animal, setAnimal] = useState("dolphin");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error("Error fetching animal word:", error);
      }
    };
    loadAnimalWord();
  }, []);

  const handleLetterCaught = (id) => {
    console.log(`Caught fish with letter: ${id} of letter`);
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
    if (fishArray.length === 0) {
      localStorage.setItem("score", score);
      navigate("/submit-score");
    }
  }, [fishArray, score, navigate]);

  return (
    <div className="game">
      <h1 className="game__detail game__detail--score">Score: {score}</h1>
      <h2 className="game__detail game__detail--timing">
        Time Remaining: {timer}s{" "}
      </h2>
      <h2 className="game__detail game__detail--word">
        Animal Word: {animal.name}{" "}
      </h2>
      {fishArray.map((fish) => (
        <FireFish
          key={fish.id}
          letter={fish.char}
          onLetterCaught={() => handleLetterCaught(fish.id)}
        />
      ))}
    </div>
  );
}

export default TypingGamePage;
