// components
import { Chip, Option } from "components";

// types
import { ArrayChipPropsType } from "./types";

export const ArrayChip = <T extends Option>(props: ArrayChipPropsType<T>) => {
  const { items, label, id, onClearFilter } = props;

  return (
    <Chip
      label={`${label}: ${items.map((item: Option) => item.value ?? item.name).join(", ")}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
