import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface ChipPropsType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text?: string | ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "none";
  onDelete?: MouseEventHandler<HTMLElement>;
  className?: string;
  icon?: ReactNode;
  textClassName?: string;
  iconClassName?: string;
}
