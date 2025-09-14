import { BaseInputPropsType } from "main";
import { HTMLProps, ReactNode } from "react";

export interface FileInputPropsType
  extends Omit<HTMLProps<HTMLInputElement>, "value" | "label">,
    BaseInputPropsType {
  label: string;
  iconClassName?: string;
  multiple?: boolean;
  children?: ReactNode;
}
