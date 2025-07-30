import { useMemo } from "react";

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
  const { label, onDelete, className = "", spanClassName = "" } = props;

  return (
    <div className={`chip-main ${className}`}>
      <span className={spanClassName}>{label}</span>
      {onDelete ? (
        <button type="button" className="chip-delete-button" onClick={onDelete}>
          <Close />
        </button>
      ) : null}
    </div>
  );
}
