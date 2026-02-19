import { HTMLProps } from "react";

// types
import { BaseInputPropsType } from "../types";

export type Option = {
  id: number | string;
  value?: number | string;
  name?: string;
};

export interface SelectInputPropsType
  extends Omit<HTMLProps<HTMLSelectElement>, "value">,
    BaseInputPropsType<string | number | readonly string[] | undefined> {
  options: Option[];
}
