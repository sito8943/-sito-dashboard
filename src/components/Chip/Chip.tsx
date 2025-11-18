// components
import { Close } from "components";

// types
import { ChipPropsType } from "./types";

// styles
import "./styles.css";

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
        <button
          type="button"
          className={`chip-delete-button ${iconClassName}`}
          onClick={onDelete}
        >
          {icon ?? <Close />}
        </button>
      ) : null}
    </div>
  );
}
