// styles
import "./styles.css";

import { Close, IconButton } from "components";

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
    <div className={`chip-main ${variant} ${className}`}>
      <span className={textClassName}>{text}</span>
      {children}
      {onDelete ? (
        <IconButton
          icon={icon ?? <Close />}
          className={`chip-delete-button ${iconClassName}`}
          onClick={onDelete}
        />
      ) : null}
    </div>
  );
}
