// @sito/ui (brings its stylesheet)
import type { IconButtonProps as UiIconButtonProps } from "@sito/ui";
import { UiIconButton } from "@/styles/sitoUi";

// lib
import { classNames } from "@/lib";

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
    size = "sm",
    iconClassName = "",
    ...rest
  } = props;

  const uiProps = {
    ...rest,
    type,
    variant,
    color,
    size,
    icon,
    iconClassName,
    className: classNames("icon-button", className, variant, color),
    children,
  } as UiIconButtonProps;

  return <UiIconButton {...uiProps} />;
};
