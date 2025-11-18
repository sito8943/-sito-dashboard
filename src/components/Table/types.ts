// lib
import { BaseDto, SortOrder } from "lib";

// component
import { TableHeaderPropsType } from "./components";

export type ActionType<TRow extends BaseDto> = {
  id: string;
  onClick: (entity?: TRow) => void;
  icon: any;
  tooltip: string;
  disabled?: boolean;
  hidden?: boolean;
};

export interface TablePropsType<TRow extends BaseDto>
  extends TableHeaderPropsType<TRow> {
  entity: string;
  data: TRow[];
  actions?: (row: TRow) => ActionType<TRow>[];
  contentClassName?: string;
  className?: string;
  softDeleteProperty?: keyof TRow;
  onSort?: (prop: string, sortOrder: SortOrder) => void;
}
