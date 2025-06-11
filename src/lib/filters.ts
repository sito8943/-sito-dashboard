export enum FilterTypes {
  text,
  number,
  select,
  autocomplete,
}

export type FilterType = {
  type: FilterTypes;
  propertyName: string;
  defaultValue: any;
};

export interface TextFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.text;
}

export interface NumberFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.number;
}

export interface AutocompleteFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.autocomplete;
}

export interface SelectFilterType extends Omit<FilterType, "type"> {
  type: FilterTypes.select;
  options: any[];
}

export type WidgetFilterProps =
  | SelectFilterType
  | AutocompleteFilterType
  | NumberFilterType
  | TextFilterType;

export type FiltersValue = {
  [key: string]: string | number | any;
};
