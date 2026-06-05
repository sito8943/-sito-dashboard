import { FilterType } from "lib";

export type FilterChip<TFilterKey extends string = string> = {
  id: TFilterKey;
  text: string;
  onClearFilter: (key: TFilterKey) => void;
};

export interface ArrayChipPropsType<
  T,
  TFilterKey extends string = string,
> extends FilterChip<TFilterKey> {
  items: T[];
}

export interface RangeChipPropsType<
  T,
  TFilterKey extends string = string,
> extends FilterChip<TFilterKey> {
  start: T;
  end: T;
}

export type ActiveFiltersPropsType<TFilterKey extends string = string> = {
  filtersDefinition: FilterType<TFilterKey>[];
};
