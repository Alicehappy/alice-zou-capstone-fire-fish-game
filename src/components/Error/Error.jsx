import "./Error.scss";
import { useNavigate } from "react-router-dom";

function Error({ error }) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="error">
      <h2 className="error__heading">Oops!</h2>
      <p className="error__message">{error}</p>
      <button
        className="error__redirect error__redirect--try-again"
        onClick={() => window.location.reload()}
      >
        <p className="error__redirect-text">Try Again</p>
      </button>

      <button
        className="error__redirect error__redirect--go-home"
        onClick={handleOnClick}
      >
        <p className="error__redirect-text">Go Home</p>
      </button>
    </div>
  );
}

export default Error;
