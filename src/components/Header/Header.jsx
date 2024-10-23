import "./Header.scss";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">FireFish</Link>
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
