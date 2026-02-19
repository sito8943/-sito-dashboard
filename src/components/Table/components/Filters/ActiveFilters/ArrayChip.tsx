// components
import { Chip, Option } from "components";

// types
import { ArrayChipPropsType } from "./types";

/**
 * Renders the ArrayChip component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const ArrayChip = <T extends Option>(props: ArrayChipPropsType<T>) => {
  const { items, text, id, onClearFilter } = props;

  return (
    <Chip
      text={`${text}: ${items.map((item: Option) => item.value ?? item.name).join(", ")}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
