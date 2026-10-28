import { HTMLProps, ReactNode } from "react";

// types
import { BaseInputPropsType } from "@/lib/form/types";

export interface TextInputPropsType
  extends
    Omit<HTMLProps<HTMLInputElement>, "value" | "label">,
    BaseInputPropsType<string | number | readonly string[] | undefined> {
  children?: ReactNode;
}
