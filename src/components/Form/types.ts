import { State } from "./utils";

export type BaseInputPropsType<TValue = unknown> = {
  state?: State;
  value: TValue;
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
