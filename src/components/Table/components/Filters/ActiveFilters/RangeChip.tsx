// components
import { Chip } from "components";

// types
import { RangeChipPropsType } from "./types";

/**
 * Renders the RangeChip component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const RangeChip = <T,>(props: RangeChipPropsType<T>) => {
  const { end, start, text, id, onClearFilter } = props;

  const hasValue = (value: unknown) => {
    return value !== null && typeof value !== "undefined" && value !== "";
  };

  return (
    <Chip
      text={`${text}: ${hasValue(start) ? start : "♾️"} - ${hasValue(end) ? end : "♾️"}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
