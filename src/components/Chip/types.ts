import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import type { ChipVariant } from "./constants";

export interface ChipPropsType extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  text?: string | ReactNode;
  /** Color variant; defaults to `"default"`. See `CHIP_VARIANTS`. */
  variant?: ChipVariant;
  onDelete?: MouseEventHandler<HTMLElement>;
  className?: string;
  icon?: ReactNode;
  textClassName?: string;
  iconClassName?: string;
}
