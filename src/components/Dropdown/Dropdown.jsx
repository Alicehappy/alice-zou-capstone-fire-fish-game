import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Dropdown.scss";

function DropdownComponent({ options, onSelect, placeholder }) {
  const formattedOptions = options.map((option) => ({
    label: option.label, 
    value: JSON.stringify(option.value),
    key: option.key,
  }));

  const handleSelect = (selected) => {
    const value = JSON.parse(selected.value); 
    onSelect(value);
  };

  return (
    <Dropdown
      options={formattedOptions}
      onChange={handleSelect}
      placeholder={placeholder}
      className="dropdown"
    />
  );
}

export default DropdownComponent;
