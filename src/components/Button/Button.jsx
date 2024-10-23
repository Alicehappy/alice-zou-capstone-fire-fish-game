import "./Button.scss";

function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const classes = `button button--${variant} ${className}`;
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
