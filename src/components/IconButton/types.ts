import { ButtonHTMLAttributes, ReactNode } from "react";

import { ButtonBaseProps } from "../Button/types";

export interface IconButtonPropsType
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {
  icon: ReactNode;
  iconClassName?: string;
}
