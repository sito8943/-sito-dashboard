// lib
import { BaseDto, SortOrder } from "lib";
import { ReactNode } from "react";

// component
import { TableHeaderPropsType } from "./components";

export type ActionType<TRow extends BaseDto> = {
  id: string;
  onClick: (entity?: TRow) => void;
  icon: any;
  tooltip: string;
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
  onMultipleClick?: (rows: TRow[]) => void;
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
  onRowSelect?: (row: TRow, selected: boolean) => void;
  onSelectedRowsChange?: (rows: TRow[]) => void;
  allowMultipleExpandedRows?: boolean;
  expandedRowId?: TRow["id"] | null;
  onExpandedRowChange?: (
    expandedRow: TRow | null,
    collapsedRow: TRow | null,
  ) => void;
  onRowExpand?: (expandedRow: TRow, collapsedRow: TRow | null) => ReactNode;
}
