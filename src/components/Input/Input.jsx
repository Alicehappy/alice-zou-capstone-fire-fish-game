import "./Input.scss";

function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
