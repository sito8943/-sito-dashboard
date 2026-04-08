// styles
import "./styles.css";

// lib
import { classNames } from "lib";

// types
import { IconButtonPropsType } from "./types";

/**
 * Renders the IconButton component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const IconButton = (props: IconButtonPropsType) => {
  const {
    children,
    icon,
    type = "button",
    className = "",
    variant = "text",
    color = "default",
    iconClassName = "",
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={classNames("icon-button", className, variant, color)}
      {...rest}
    >
      <span className={iconClassName}>{icon}</span>
      {children}
    </button>
  );
};
