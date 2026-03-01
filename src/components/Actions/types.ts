import { ActionType } from "components";
import { BaseDto } from "lib";
import { ReactNode } from "react";

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
  showTooltips?: boolean;
  className?: string;
}
