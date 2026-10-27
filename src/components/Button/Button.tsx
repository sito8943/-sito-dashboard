// @sito/ui (brings its stylesheet)
import { UiButton } from "../../styles/sitoUi";

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
    <UiButton
      type={type}
      className={classNames("button", variant, color, className)}
      variant={variant}
      color={color}
      {...rest}
    >
      {children}
    </UiButton>
  );
};
