import { HTMLAttributes } from "react";

export interface TooltipPropsType extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
}
