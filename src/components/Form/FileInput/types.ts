import { HTMLProps, ReactNode } from "react";

// types
import { BaseInputPropsType } from "../types";

export interface FileInputPropsType
  extends
    Omit<HTMLProps<HTMLInputElement>, "value" | "label">,
    Omit<BaseInputPropsType, "value" | "label"> {
  iconClassName?: string;
  multiple?: boolean;
  children?: ReactNode;
  label: string | ReactNode;
  onClear?: () => void;
}
