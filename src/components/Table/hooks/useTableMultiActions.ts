// lib
import { BaseDto } from "lib";
import { useCallback, useMemo } from "react";

// types
import { ActionType } from "../types";

interface UseTableMultiActionsParams<TRow extends BaseDto> {
  actions?: (row: TRow) => ActionType<TRow>[];
  selectedRowsData: TRow[];
}

/**
 * Computes the set of bulk actions shared across all selected rows and provides a click handler.
 * An action is included only if it is present (and not hidden) on every selected row; the `disabled`
 * flag is set if any row marks the action as disabled.
 * @param root0 - Hook parameters.
 * @param root0.actions - Function that returns the action list for a given row.
 * @param root0.selectedRowsData - Array of currently selected row objects.
 * @returns multiActions — filtered shared actions, and handleMultipleActionClick — handler that calls `onMultipleClick` or iterates over selected rows.
 */
export function useTableMultiActions<TRow extends BaseDto>({
  actions,
  selectedRowsData,
}: UseTableMultiActionsParams<TRow>) {
  const multiActions = useMemo<ActionType<TRow>[]>(() => {
    if (!actions || !selectedRowsData.length) return [];

    return selectedRowsData.reduce<ActionType<TRow>[]>(
      (sharedActions, row, index) => {
        const rowActions = actions(row).filter(
          (action) => action.multiple && !action.hidden,
        );

        if (index === 0) return rowActions;

        const sharedMap = new Map(
          sharedActions.map((action) => [action.id, action]),
        );

        return rowActions.reduce<ActionType<TRow>[]>((acc, action) => {
          const existing = sharedMap.get(action.id);
          if (existing) {
            acc.push({
              ...existing,
              ...action,
              disabled: action.disabled || existing.disabled,
            });
          }
          return acc;
        }, []);
      },
      [],
    );
  }, [actions, selectedRowsData]);

  const handleMultipleActionClick = useCallback(
    (action: ActionType<TRow>) => {
      if (!selectedRowsData.length) return;
      if (action.onMultipleClick) {
        action.onMultipleClick(selectedRowsData);
        return;
      }

      selectedRowsData.forEach((row) => action.onClick(row));
    },
    [selectedRowsData],
  );

  return { multiActions, handleMultipleActionClick };
}
