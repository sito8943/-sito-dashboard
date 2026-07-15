import { ButtonHTMLAttributes, ReactNode } from "react";
import type { IconButtonSize } from "@sito/ui";

import { ButtonBaseProps } from "../Button/types";

export interface IconButtonPropsType
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonBaseProps {
  icon: ReactNode;
  iconClassName?: string;
  size?: IconButtonSize;
}
