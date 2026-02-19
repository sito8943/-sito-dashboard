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

  return (
    <Chip
      text={`${text}: ${!!start ? start : "♾️"} - ${!!end ? end : "♾️"}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
