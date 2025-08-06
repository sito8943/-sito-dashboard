import { FilterType } from "lib";

export type FilterChip = {
  label: string;
  onClearFilter: (key: string) => void;
};

export interface ArrayChipPropsType<T> extends FilterChip {
  items: T[];
}

export interface RangeChipPropsType<T> extends FilterChip {
  start: T;
  end: T;
}

export type ActiveFiltersPropsType = {
  filtersDefinition: FilterType[];
};
