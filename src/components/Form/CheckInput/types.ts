import { HTMLProps } from "react";

// types
import { BaseInputPropsType } from "../types";

export interface CheckInputPropsType
  extends HTMLProps<HTMLInputElement>,
    Omit<BaseInputPropsType, "value" | "onChange"> {}
