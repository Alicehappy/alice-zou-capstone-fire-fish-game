import "./Input.scss";

function Input({ className, value, onChange, placeholder }) {
  return (
    <input
      className={`${className} input`}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
