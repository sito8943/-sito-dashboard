// lib
import { BaseDto, SortOrder } from "@/lib";
import { ReactNode } from "react";

// component
import type { ActionType } from "@/components/molecules/Actions/types";

import { TableHeaderPropsType } from "./components";

// `ActionType` lives with the Actions molecule; re-exported here so the
// `./Table` subpath keeps exposing it.
export type { ActionType };

export interface TablePropsType<
  TRow extends BaseDto,
> extends TableHeaderPropsType<TRow> {
  entity?: string;
  data: TRow[];
  actions?: (row: TRow) => ActionType<TRow>[];
  contentClassName?: string;
  className?: string;
  /** Previews the next order while hovering an inactive sortable header. */
  showSortPreviewOnHover?: boolean;
  softDeleteProperty?: keyof TRow;
  onSort?: (prop: Extract<keyof TRow, string>, sortOrder: SortOrder) => void;
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
