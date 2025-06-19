// types
import { TextInputPropsType, Option } from "components";

export interface AutocompleteInputPropsType extends TextInputPropsType {
  multiple?: boolean;
  inputContainerClassName?: string;
  options: Option[];
}
