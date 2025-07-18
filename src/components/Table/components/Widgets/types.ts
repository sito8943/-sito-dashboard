import { HTMLInputTypeAttribute } from "react";

// lib
import {
  AutocompleteFilterType,
  CheckFilterType,
  DateFilterType,
  SelectFilterType,
  TextFilterType,
} from "lib";

export interface SelectWidgetPropsType extends SelectFilterType {}

export interface RangeWidgetPropsType extends DateFilterType {
  inputType: HTMLInputTypeAttribute;
}

export interface AutocompleteWidgetPropsType extends AutocompleteFilterType {
  multiple?: boolean;
}

export interface CheckWidgetPropsType extends CheckFilterType {}

export interface TextWidgetPropsType extends TextFilterType {}
