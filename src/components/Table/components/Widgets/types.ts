// lib
import {
  AutocompleteFilterType,
  CheckFilterType,
  RangeFilterType,
  SelectFilterType,
  TextFilterType,
} from "lib";
import { HTMLInputTypeAttribute } from "react";

export type SelectWidgetPropsType = SelectFilterType;

export interface RangeWidgetPropsType<T> extends RangeFilterType<T> {
  inputType: HTMLInputTypeAttribute;
}

export interface AutocompleteWidgetPropsType extends AutocompleteFilterType {
  multiple?: boolean;
}

export type CheckWidgetPropsType = CheckFilterType;

export type TextWidgetPropsType = TextFilterType;
