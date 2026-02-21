// styles
import "./styles.css";

// types
import { ButtonPropsType } from "./types";

/**
 * Renders the Button component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const Button = (props: ButtonPropsType) => {
  const {
    children,
    type = "button",
    variant = "text",
    color = "default",
    className = "",
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={`button ${variant} ${color} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
