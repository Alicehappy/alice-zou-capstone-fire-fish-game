import "./ScoreboardPage.scss";
import { useEffect, useState } from "react";
import Error from "../../components/Error/Error";
import { fetchSores } from "../../services/scoreboard-api";
import PeacefulBubblesParticles from "../../components/PeacefulBubblesParticles/PeacefulBubblesParticles";

function ScoreboardPage() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchSores();
        setScores(data);
      } catch (err) {
        console.error("Error fetching top scores:", err);
        setError("Failed to load scores.");
      }
    };
    loadScores();
  }, []);

  if (error) return <Error error={error} />;

  return (
    <div className="scoreboard">
      <h1 className="scoreboard__title">Top Scores</h1>
      <PeacefulBubblesParticles key="scoreboard" />
      <ul className="scoreboard__list">
        {scores.map((score, index) => (
          <li key={score.id} className="scoreboard__item">
            <span className="scoreboard__rank">{index + 1}.</span>
            <span className="scoreboard__name">{score.user_name}</span>
            <span className="scoreboard__score">{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreboardPage;
