// components
import { Chip } from "components";

// types
import { RangeChipPropsType } from "./types";

/**
 *
 * @param props
 */
export const RangeChip = <T extends any>(props: RangeChipPropsType<T>) => {
  const { end, start, text, id, onClearFilter } = props;

  return (
    <Chip
      text={`${text}: ${!!start ? start : "♾️"} - ${!!end ? end : "♾️"}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
