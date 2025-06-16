import { useMemo } from "react";

// components
import { Close } from "components";

// types
import { ChipPropsType, ChipVariant } from "./types";

// styles
import "./styles.css";

/**
 * Chip component
 * @param {object} props - component props
 * @returns Chip component
 */
export function Chip(props: ChipPropsType) {
  const {
    label,
    onDelete,
    className = "",
    spanClassName = "",
    variant = ChipVariant.default,
  } = props;

  const localVariant = useMemo(() => {
    switch (variant) {
      case ChipVariant.empty:
        return "text-primary bg-transparent";
      case ChipVariant.outlined:
        return "border border-primary";
      case ChipVariant.default:
      default:
        return "text-white bg-primary";
    }
  }, [variant]);

  return (
    <div className={`chip-main ${localVariant} ${className}`}>
      <span className={spanClassName}>{label}</span>
      {onDelete ? (
        <button type="button" className="chip-delete-button" onClick={onDelete}>
          <Close />
        </button>
      ) : null}
    </div>
  );
}
