import { BaseDto } from "@/lib";
import { ReactNode } from "react";

export type ActionType<TRow extends BaseDto> = {
  id: string;
  onClick: (entity?: TRow) => void;
  icon: ReactNode;
  tooltip: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  sticky?: boolean;
  onMultipleClick?: (rows: TRow[]) => void;
};

export type ActionsContainerPropsType<TRow extends BaseDto> = {
  actions: ActionPropsType<TRow>[];
  className?: string;
  itemClassName?: string;
  actionClassName?: string;
  showActionTexts?: boolean;
  showTooltips?: boolean;
};

export interface ActionPropsType<
  TRow extends BaseDto,
> extends ActionType<TRow> {
  children?: ReactNode;
  showText?: boolean;
  "aria-describedby"?: string;
  stopPropagation?: boolean;
}
