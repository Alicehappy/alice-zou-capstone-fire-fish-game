import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Dropdown.scss";

function DropdownComponent({ options, onSelect, placeholder }) {
  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      placeholder={placeholder}
      className="dropdown"
    />
  );
}

export default DropdownComponent;
