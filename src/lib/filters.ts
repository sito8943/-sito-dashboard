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
};

export interface TextFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.text;
}

export interface NumberFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.number;
  min: number;
  max: number;
}

export interface AutocompleteFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.autocomplete;
  options: Option[];
}

export interface SelectFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.select;
  options: Option[];
}

export interface DateFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.date;
  min: string;
  max: string;
}

export interface CheckFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.check;
}

export type WidgetFilterProps =
  | SelectFilterType
  | AutocompleteFilterType
  | NumberFilterType
  | TextFilterType
  | DateFilterType
  | CheckFilterType;

export type FiltersValue = {
  [key: string]: { value: string | number | any };
};
