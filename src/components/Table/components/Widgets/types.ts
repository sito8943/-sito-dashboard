import {
  AutocompleteFilterType,
  CheckFilterType,
  DateFilterType,
  NumberFilterType,
  SelectFilterType,
  TextFilterType,
} from "lib";

export interface SelectWidgetPropsType extends SelectFilterType {}

export interface DateWidgetPropsType extends DateFilterType {}

export interface AutocompleteWidgetPropsType extends AutocompleteFilterType {
  multiple?: boolean;
}

export interface CheckWidgetPropsType extends CheckFilterType {}

export interface TextWidgetPropsType extends TextFilterType {}

export interface NumberWidgetPropsType extends NumberFilterType {}
