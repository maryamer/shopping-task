const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};
const btnSize = {
  lg: "btn--large",
  md: "btn--medium",
};
function Button({
  children,
  size = "lg",
  onClick,
  variant = "primary",
  className,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={`btn ${btnType[variant]} ${btnSize[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
