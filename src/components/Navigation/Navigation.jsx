import { NavLink } from "react-router-dom";
import "./Navigation.scss";

function Navigation() {
  return (
    <nav className="navigation">
      <button className="burger"><span></span><span></span><span></span></button>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" className="navigation__link" activeclassname="navigation__link--active" exact="true">
            Home
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/typing-game" className="navigation__link" activeclassname="navigation__link--active">
            Typing Game
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/scoreboard" className="navigation__link" activeclassname="navigation__link--active">
            Scoreboard
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/animal-selection" className="navigation__link" 
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
