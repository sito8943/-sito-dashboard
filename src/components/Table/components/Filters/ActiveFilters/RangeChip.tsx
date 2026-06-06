// components
import { Chip } from "components";

// types
import { RangeChipPropsType } from "./types";

/**
 * Renders the RangeChip component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const RangeChip = <T, TFilterKey extends string = string>(
  props: RangeChipPropsType<T, TFilterKey>,
) => {
  const { end, start, text, id, onClearFilter } = props;

  const hasValue = (value: unknown) => {
    return value !== null && typeof value !== "undefined" && value !== "";
  };

  const formatValue = (value: T | "♾️") => String(value);

  return (
    <Chip
      text={`${text}: ${formatValue(hasValue(start) ? start : "♾️")} - ${formatValue(hasValue(end) ? end : "♾️")}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
