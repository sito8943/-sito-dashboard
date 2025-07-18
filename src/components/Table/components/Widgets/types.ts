import { HTMLInputTypeAttribute } from "react";

// lib
import {
  AutocompleteFilterType,
  CheckFilterType,
  RangeFilterType,
  SelectFilterType,
  TextFilterType,
} from "lib";

export interface SelectWidgetPropsType extends SelectFilterType {}

export interface RangeWidgetPropsType<T> extends RangeFilterType<T> {
  inputType: HTMLInputTypeAttribute;
}

export interface AutocompleteWidgetPropsType extends AutocompleteFilterType {
  multiple?: boolean;
}

export interface CheckWidgetPropsType extends CheckFilterType {}

export interface TextWidgetPropsType extends TextFilterType {}
