import { State } from "./utils";

export type BaseInputPropsType = {
  state?: State;
  value: any;
  onChange: (e: any) => void;
  name?: string;
  id?: string;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  placeholder?: string;
};
