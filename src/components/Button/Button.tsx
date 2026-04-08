// styles
import "./styles.css";

// lib
import { classNames } from "lib";

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
      className={classNames("button", variant, color, className)}
      {...rest}
    >
      {children}
    </button>
  );
};
