import { HTMLProps } from "react";

// types
import { BaseInputPropsType } from "../types";

export type Option = {
  id: number | string;
  value: number | string;
};

export interface SelectInputPropsType
  extends Omit<HTMLProps<HTMLSelectElement>, "value" | "onChange">,
    BaseInputPropsType {
  options: Option[];
}
