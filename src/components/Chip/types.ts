import { MouseEventHandler, ReactNode } from "react";

export type ChipPropsType = {
  label?: string | ReactNode;
  onDelete?: MouseEventHandler<HTMLElement>;
  className?: string;
  spanClassName?: string;
};
