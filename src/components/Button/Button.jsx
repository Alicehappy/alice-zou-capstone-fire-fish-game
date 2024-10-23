import "./Button.scss";

function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
}) {
  const className = `button button--${variant}`;
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
