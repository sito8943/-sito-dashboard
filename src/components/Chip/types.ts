import { MouseEventHandler, ReactNode } from "react";

export enum ChipVariant {
  empty = "empty",
  outlined = "outlined",
  default = "default",
}

export type ChipPropsType = {
  variant?: ChipVariant;
  label?: string | ReactNode;
  onDelete?: MouseEventHandler<HTMLElement>;
  className?: string;
  spanClassName?: string;
};
