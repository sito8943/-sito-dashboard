import { HTMLProps } from "react";

export interface LoadingPropsType extends HTMLProps<HTMLDivElement> {
  color?: string;
  loaderClass?: string;
  strokeWidth?: string;
}
