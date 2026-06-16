import { ButtonHTMLAttributes } from "react";

export type ButtonBaseProps = {
  variant?: "text" | "submit" | "outlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info";
  /* Allow arbitrary `data-*` attributes (e.g. react-tooltip's
     `data-tooltip-id`). React's HTMLAttributes don't expose these for bracket
     access, and consumers that rely on a global augmentation lose it when the
     lib's React types resolve via a different path (symlinked/linked installs).
     This index signature makes data-* access type-safe regardless. */
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export interface ButtonPropsType
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {}
