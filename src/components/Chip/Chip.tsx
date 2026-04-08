// styles
import "./styles.css";

import { Close, IconButton } from "components";
import { classNames } from "lib";

// types
import { ChipPropsType } from "./types";

/**
 * Chip component
 * @param {object} props - component props
 * @returns Chip component
 */
export function Chip(props: ChipPropsType) {
  const {
    text,
    onDelete,
    children,
    icon,
    variant = "default",
    iconClassName = "",
    className = "",
    textClassName = "",
  } = props;

  return (
    <div
      className={classNames(
        "chip-main",
        variant,
        onDelete ? "deletable" : "",
        className,
      )}
    >
      <span className={classNames("chip-main-text", textClassName)}>
        {text}
      </span>
      {children}
      {onDelete ? (
        <IconButton
          icon={icon ?? <Close />}
          className={classNames("chip-delete-button", iconClassName)}
          onClick={onDelete}
        />
      ) : null}
    </div>
  );
}
