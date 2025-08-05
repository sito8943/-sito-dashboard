import { FilterType } from "lib";

export type RangeChipPropsType<T> = {
  start: T;
  end: T;
  label: string;
  onClearFilter: (key: string) => void;
};

export type ActiveFiltersPropsType = {
  filtersDefinition: FilterType[];
};
