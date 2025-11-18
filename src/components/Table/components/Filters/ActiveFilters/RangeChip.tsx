// components
import { Chip } from "components";

// types
import { RangeChipPropsType } from "./types";

export const RangeChip = <T extends any>(props: RangeChipPropsType<T>) => {
  const { end, start, label, onClearFilter } = props;

  return (
    <Chip
      text={`${label}: ${!!start ? start : "♾️"} - ${!!end ? end : "♾️"}`}
      onDelete={() => onClearFilter(label)}
    />
  );
};
