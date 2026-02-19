import { HTMLProps, ReactNode } from "react";

// types
import { BaseInputPropsType } from "../types";

export interface TextInputPropsType
  extends Omit<HTMLProps<HTMLInputElement>, "value">,
    BaseInputPropsType<string | number | readonly string[] | undefined> {
  children?: ReactNode;
}
