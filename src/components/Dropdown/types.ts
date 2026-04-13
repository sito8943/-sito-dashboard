import { HTMLProps } from "react";

export interface DropdownPropsType extends HTMLProps<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
}

export type DropdownPositionType = {
  top: number;
  left: number;
};
