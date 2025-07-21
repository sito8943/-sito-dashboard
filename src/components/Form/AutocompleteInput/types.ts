// types
import { TextInputPropsType, Option } from "components";

export interface AutocompleteInputPropsType extends Omit<TextInputPropsType, "onChange"> {
  onChange: (value: Option | Option[] | null) => void
  multiple?: boolean;
  inputContainerClassName?: string;
  options: Option[];
}
