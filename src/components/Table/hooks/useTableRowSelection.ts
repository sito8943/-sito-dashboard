// lib
import { BaseDto } from "lib";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseTableRowSelectionParams<TRow extends BaseDto> {
  data: TRow[];
  onRowSelect?: (row: TRow, selected: boolean) => void;
  onSelectedRowsChange?: (rows: TRow[]) => void;
}

/**
 * Manages row selection state for the Table component.
 * Handles individual row toggling, select-all, and keeps selection in sync when data changes.
 * @param root0 - Hook parameters.
 * @param root0.data - Array of row data; used to sync selection when rows are added or removed.
 * @param root0.onRowSelect - Optional callback fired when a single row is selected or deselected.
 * @param root0.onSelectedRowsChange - Optional callback fired with the full array of selected rows whenever selection changes.
 * @returns Selection state and handlers: selectedRows, selectedRowsData, selectionState, onRowSelectionChange, onToggleAllRows.
 */
export function useTableRowSelection<TRow extends BaseDto>({
  data,
  onRowSelect,
  onSelectedRowsChange,
}: UseTableRowSelectionParams<TRow>) {
  const [selectedRows, setSelectedRows] = useState<Set<TRow["id"]>>(new Set());

  const selectedRowsData = useMemo(
    () => data?.filter((row) => selectedRows.has(row.id)) ?? [],
    [data, selectedRows],
  );

  useEffect(() => {
    if (!data?.length) {
      setSelectedRows(new Set());
      return;
    }

    setSelectedRows((prevSelected) => {
      const nextSelected = new Set<TRow["id"]>();
      const currentIds = new Set(data.map((row) => row.id));

      prevSelected.forEach((rowId) => {
        if (currentIds.has(rowId)) {
          nextSelected.add(rowId);
        }
      });

      return nextSelected;
    });
  }, [data]);

  useEffect(() => {
    if (!onSelectedRowsChange) return;
    onSelectedRowsChange(selectedRowsData);
  }, [selectedRowsData, onSelectedRowsChange]);

  const onRowSelectionChange = useCallback(
    (row: TRow) => {
      setSelectedRows((prevSelected) => {
        const nextSelected = new Set(prevSelected);
        if (nextSelected.has(row.id)) {
          nextSelected.delete(row.id);
          onRowSelect?.(row, false);
        } else {
          nextSelected.add(row.id);
          onRowSelect?.(row, true);
        }

        return nextSelected;
      });
    },
    [onRowSelect],
  );

  const onToggleAllRows = useCallback(() => {
    setSelectedRows((prevSelected) => {
      const nextSelected = new Set(prevSelected);
      const visibleRows = data ?? [];
      const areAllSelected = visibleRows.every((row) =>
        nextSelected.has(row.id),
      );

      visibleRows.forEach((row) => {
        const isRowSelected = nextSelected.has(row.id);
        if (areAllSelected) {
          if (isRowSelected) {
            nextSelected.delete(row.id);
            onRowSelect?.(row, false);
          }
        } else if (!isRowSelected) {
          nextSelected.add(row.id);
          onRowSelect?.(row, true);
        }
      });

      return nextSelected;
    });
  }, [data, onRowSelect]);

  const selectionState = useMemo(() => {
    if (!data?.length) {
      return { allSelected: false, hasSomeSelected: false };
    }

    const allSelected = data.every((row) => selectedRows.has(row.id));
    const hasSomeSelected = data.some((row) => selectedRows.has(row.id));

    return { allSelected, hasSomeSelected };
  }, [data, selectedRows]);

  return {
    selectedRows,
    selectedRowsData,
    selectionState,
    onRowSelectionChange,
    onToggleAllRows,
  };
}
