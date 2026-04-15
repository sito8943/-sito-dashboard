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
  label?: string | ReactNode;
  onClear?: () => void;
  /**
   * Renders only the native input element without container, label and preview UI.
   */
  unstyled?: boolean;
  /**
   * Alias of `unstyled` kept for semantic clarity in hidden-input use cases.
   */
  hiddenContainer?: boolean;
}
