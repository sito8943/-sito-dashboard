// types
import { Option } from "@/components/atoms/SelectInput";
import { TextInputPropsType } from "@/components/atoms/TextInput";
import { ReactNode } from "react";

export interface AutocompleteCreateOptionConfig {
  onCreate: (inputValue: string) => void;
  renderLabel: (inputValue: string) => ReactNode;
  /**
   * Returns true when the typed value already exists, hiding the create option.
   * Runs in addition to the built-in exact label match.
   */
  isExisting?: (inputValue: string) => boolean;
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
