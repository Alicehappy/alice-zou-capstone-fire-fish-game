import { NavLink } from "react-router-dom";
import "./Navigation.scss";

const handleLinkClick = () => {
  document.querySelectorAll(".navigation__link").forEach((link) => {
    link.blur();
  });
};

function Navigation() {
  return (
    <nav className="navigation">
      <button className="burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="navigation__link"
            activeclassname="navigation__link--active"
            exact="true"
          >
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/typing-game"
            onClick={handleLinkClick}
            className="navigation__link"
            activeclassname="navigation__link--active"
          >
            Typing Game
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/scoreboard"
            onClick={handleLinkClick}
            className="navigation__link navigation__link--scoreboard"
            activeclassname="navigation__link--active"
          >
            Scoreboard
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/animal-selection"
            onClick={handleLinkClick}
            className="navigation__link"
            activeclassname="navigation__link--active"
          >
            Select Animals
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
