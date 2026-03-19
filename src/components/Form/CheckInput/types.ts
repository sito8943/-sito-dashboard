import { HTMLProps } from "react";

// types
import { BaseInputPropsType } from "../types";

export interface CheckInputPropsType
  extends
    Omit<HTMLProps<HTMLInputElement>, "label">,
    Omit<BaseInputPropsType, "value" | "onChange"> {}
