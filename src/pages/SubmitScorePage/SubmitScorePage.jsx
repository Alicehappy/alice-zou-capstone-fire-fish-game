import "./SubmitScorePage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { saveScore } from "../../services/scoreboard-api";

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

  return (
    <div className="submit-score">
      <h1 className="submit-score__title">Game Over!</h1>
      <h3>Your score: {score}</h3>
      {username && <h3>Player: {username}</h3>}
      <Button onClick={submitScore}>Submit Score</Button>
      {submissionStatus && (
        <p className="submit-score__status">{submissionStatus}</p>
      )}
    </div>
  );
}

export default SubmitScorePage;
