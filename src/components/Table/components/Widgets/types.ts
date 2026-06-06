// lib
import {
  AutocompleteFilterType,
  CheckFilterType,
  RangeFilterType,
  SelectFilterType,
  TextFilterType,
} from "lib";
import { HTMLInputTypeAttribute } from "react";

export type SelectWidgetPropsType<TFilterKey extends string = string> =
  SelectFilterType<TFilterKey>;

export interface RangeWidgetPropsType<
  T,
  TFilterKey extends string = string,
> extends RangeFilterType<T, TFilterKey> {
  inputType: HTMLInputTypeAttribute;
}

export interface AutocompleteWidgetPropsType<
  TFilterKey extends string = string,
> extends AutocompleteFilterType<TFilterKey> {
  multiple?: boolean;
}

export type CheckWidgetPropsType<TFilterKey extends string = string> =
  CheckFilterType<TFilterKey>;

export type TextWidgetPropsType<TFilterKey extends string = string> =
  TextFilterType<TFilterKey>;
