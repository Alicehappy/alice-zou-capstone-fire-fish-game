import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TypingGamePage from "./pages/TypingGamePage/TypingGamePage";
import SubmitScorePage from "./pages/SubmitScorePage/SubmitScorePage";
import ScoreboardPage from "./pages/ScoreboardPage/ScoreboardPage";
import AnimalSelectionPage from "./pages/AnimalSelectionPage/AnimalSelectionPage";
import Page404 from "./pages/Page404/Page404";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/typing-game" element={<TypingGamePage />} />
        <Route path="/save-score" element={<SubmitScorePage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/animal-selection" element={<AnimalSelectionPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
