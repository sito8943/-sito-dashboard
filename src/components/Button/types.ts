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
};

export interface ButtonPropsType
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {}
