import { HTMLProps } from "react";
import { State } from "../utils";

export type Option = {
  id: number | string;
  value: number | string;
};

export interface SelectInputPropsType extends HTMLProps<HTMLSelectElement> {
  state?: State;
  value: any;
  onChange: (e: any) => void;
  options: Option[];
  name?: string;
  id?: string;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  placeholder?: string;
}
