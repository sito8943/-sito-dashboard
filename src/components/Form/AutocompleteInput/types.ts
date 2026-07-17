// types
import { Option, TextInputPropsType } from "components";
import { ReactNode } from "react";

export interface AutocompleteCreateOptionConfig {
  onCreate: (inputValue: string) => void;
  renderLabel: (inputValue: string) => ReactNode;
}

export interface AutocompleteInputPropsType extends Omit<
  TextInputPropsType,
  "onChange" | "value"
> {
  value: Option | Option[] | null;
  onChange: (value: Option | Option[] | null) => void;
  multiple?: boolean;
  autoSelectOnBlur?: boolean;
  createOption?: AutocompleteCreateOptionConfig;
  inputContainerClassName?: string;
  options: Option[];
}
