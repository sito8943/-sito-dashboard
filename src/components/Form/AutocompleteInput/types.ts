// types
import { Option, TextInputPropsType } from "components";

export interface AutocompleteInputPropsType
  extends Omit<TextInputPropsType, "onChange" | "value"> {
  value: Option | Option[] | null;
  onChange: (value: Option | Option[] | null) => void;
  multiple?: boolean;
  inputContainerClassName?: string;
  options: Option[];
}
