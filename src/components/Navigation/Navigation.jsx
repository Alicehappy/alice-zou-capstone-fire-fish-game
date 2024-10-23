import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" activeclassname="navigation__link--active" exact="true">
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/typing-game" activeclassname="navigation__link--active">
            Typing Game
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/scoreboard" activeclassname="navigation__link--active">
            Scoreboard
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/animal-selection"
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
