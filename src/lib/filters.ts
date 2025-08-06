import { Option } from "components";

export enum FilterTypes {
  text,
  number,
  select,
  autocomplete,
  date,
  check,
}

export type FilterType = {
  type: FilterTypes;
  propertyName: string;
  label?: string;
  defaultValue?: any;
  placeholder?: string;
};

export interface TextFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.text;
}

export interface RangeFilterType<T> extends Omit<FilterType, "type"> {
  type: FilterTypes.number | FilterTypes.date;
  min: T;
  max: T;
}

export interface AutocompleteFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.autocomplete;
  options: Option[];
}

export interface SelectFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.select;
  options: Option[];
}

export interface CheckFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.check;
}

export type WidgetFilterProps =
  | SelectFilterType
  | AutocompleteFilterType
  | RangeFilterType<undefined>
  | TextFilterType
  | CheckFilterType;

export type FiltersValue = {
  [key: string]: { value: string | number | any };
};
