import { HTMLProps, ReactNode } from "react";

// types
import { BaseInputPropsType } from "../types";

export interface TextInputPropsType
  extends Omit<HTMLProps<HTMLInputElement>, "value">,
    BaseInputPropsType {
  children?: ReactNode;
}
