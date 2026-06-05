// components
import { Chip, Option } from "components";

// types
import { ArrayChipPropsType } from "./types";

/**
 * Renders the ArrayChip component.
 * @param item item to format
 * @returns Function result.
 */
const formatItem = (item: unknown) => {
  if (typeof item === "object" && item !== null) {
    const option = item as Option;
    return String(option.value ?? option.name ?? "");
  }

  return String(item);
};

/**
 *
 * @param props - props parameter.
 * @returns Function result.
 */
export const ArrayChip = <T, TFilterKey extends string = string>(
  props: ArrayChipPropsType<T, TFilterKey>,
) => {
  const { items, text, id, onClearFilter } = props;

  return (
    <Chip
      text={`${text}: ${items.map((item) => formatItem(item)).join(", ")}`}
      onDelete={() => onClearFilter(id)}
    />
  );
};
