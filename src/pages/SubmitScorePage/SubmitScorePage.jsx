import "./SubmitScorePage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { saveScore } from "../../services/scoreboard-api";
import PeacefulBubblesParticles from "../../components/PeacefulBubblesParticles/PeacefulBubblesParticles";
import FishParticlesGame from "../../components/FishParticlesGame/FishParticlesGame";

const port = import.meta.env.VITE_PORT;
const backendURL = import.meta.env.VITE_BACKEND_URL;

function SubmitScorePage() {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Guest";
    const savedScore = localStorage.getItem("score") || 0;
    setUsername(savedUsername);
    setScore(Number(savedScore));
  }, []);

  const submitScore = async () => {
    const scoreData = { user_name: username, score };

    try {
      const response = await saveScore(scoreData);
      setSubmissionStatus("Score submitted successfully!");
      console.log("Score submitted", response);
      navigate("/scoreboard");
    } catch (error) {
      setSubmissionStatus("Error submitting score.");
      console.error("Error: ", error);
    }
  };

  const handleOnTryAgain = () => {
    navigate("/typing-game");
  };

  return (
    <div className="submit-score">
      <h1 className="submit-score__title">Game Over!</h1>
      <PeacefulBubblesParticles key="submit-score" />
      <p className="submit-score__score">Your score: {score}</p>
      {username && <p className="submit-score__player">Player: {username}</p>}
      <div className="submit-score__actions">
        <Button variant="secondary" onClick={submitScore}>
          Submit Score
        </Button>
        <Button onClick={handleOnTryAgain}>Try Again</Button>
      </div>
      {submissionStatus && (
        <p className="submit-score__status">{submissionStatus}</p>
      )}
      <h2 className="submit-score__fish-title">A Sleeping Fish in Aquarium</h2>
      <FishParticlesGame className="submit-score__fish" />
    </div>
  );
}

export default SubmitScorePage;
