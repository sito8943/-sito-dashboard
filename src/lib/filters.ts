import { Option } from "components";

export enum FilterTypes {
  text,
  number,
  select,
  autocomplete,
  date,
  check,
}

export type FilterType<TPropertyName extends string = string> = {
  type: FilterTypes;
  propertyName: TPropertyName;
  label?: string;
  defaultValue?: any;
  placeholder?: string;
};

export interface TextFilterType<
  TPropertyName extends string = string,
> extends Omit<FilterType<TPropertyName>, "type"> {
  type: FilterTypes.text;
}

export interface RangeFilterType<
  T,
  TPropertyName extends string = string,
> extends Omit<FilterType<TPropertyName>, "type"> {
  type: FilterTypes.number | FilterTypes.date;
  min: T;
  max: T;
}

export interface AutocompleteFilterType<
  TPropertyName extends string = string,
> extends Omit<FilterType<TPropertyName>, "type"> {
  type: FilterTypes.autocomplete;
  options: Option[];
}

export interface SelectFilterType<
  TPropertyName extends string = string,
> extends Omit<FilterType<TPropertyName>, "type"> {
  type: FilterTypes.select;
  options: Option[];
}

export interface CheckFilterType<
  TPropertyName extends string = string,
> extends Omit<FilterType<TPropertyName>, "type"> {
  type: FilterTypes.check;
}

export type WidgetFilterProps<TPropertyName extends string = string> =
  | SelectFilterType<TPropertyName>
  | AutocompleteFilterType<TPropertyName>
  | RangeFilterType<undefined, TPropertyName>
  | TextFilterType<TPropertyName>
  | CheckFilterType<TPropertyName>;

export type FiltersValue<TFilterKey extends string = string> = Partial<
  Record<TFilterKey, { value: unknown }>
>;
