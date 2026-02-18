import { useCallback, useEffect, useMemo, useState } from "react";

// components
import { Loading, Tooltip } from "components";

// table components
import { TableEmpty, Columns, Footer, Rows, TableHeader } from "./components/";

// providers
import { FiltersProvider, useTranslation } from "providers";

// types
import { ActionType, TablePropsType } from "./types";

// lib
import { BaseDto } from "lib";

// styles
import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

export function Table<TRow extends BaseDto>(props: TablePropsType<TRow>) {
  const {
    data,
    onSort,
    entity = "",
    isLoading = false,
    actions,
    columns = [],
    contentClassName = "",
    className = "",
    softDeleteProperty = "deletedAt",
    onRowSelect,
    onSelectedRowsChange,
    ...rest
  } = props;

  const { t } = useTranslation();

  const [selectedRows, setSelectedRows] = useState<Set<TRow["id"]>>(new Set());

  const isEmpty = useMemo(() => !data?.length, [data]);

  const selectedRowsData = useMemo(
    () => data?.filter((row) => selectedRows.has(row.id)) ?? [],
    [data, selectedRows]
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
    [onRowSelect]
  );

  const onToggleAllRows = useCallback(() => {
    setSelectedRows((prevSelected) => {
      const nextSelected = new Set(prevSelected);
      const visibleRows = data ?? [];
      const areAllSelected = visibleRows.every((row) =>
        nextSelected.has(row.id)
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

  useEffect(() => {
    if (!onSelectedRowsChange) return;
    onSelectedRowsChange(selectedRowsData);
  }, [selectedRowsData, onSelectedRowsChange]);

  const multiActions = useMemo<ActionType<TRow>[]>(() => {
    if (!actions || !selectedRowsData.length) return [];

    return selectedRowsData.reduce<ActionType<TRow>[]>((sharedActions, row, index) => {
      const rowActions = actions(row).filter(
        (action) => action.multiple && !action.hidden
      );

      if (index === 0) return rowActions;

      const sharedMap = new Map(sharedActions.map((action) => [action.id, action]));

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
    }, []);
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
    [selectedRowsData]
  );

  return (
    <FiltersProvider>
      <div className={`${className} table-main`}>
        <TableHeader columns={columns} isLoading={isLoading} {...rest} />
        {!isLoading ? (
          <>
            {!isEmpty ? (
              <>
                {!!selectedRowsData.length && (
                  <div className="table-selection-bar">
                    <p className="table-selection-bar-count">
                      {t("_accessibility:components.table.selectedCount", {
                        count: selectedRowsData.length,
                      })}
                    </p>
                    {multiActions.length > 0 && (
                    <div className="table-selection-bar-actions">
                        {multiActions.map((action) => (
                          <Tooltip key={action.id} content={action.tooltip}>
                            <button
                              type="button"
                              onClick={() => handleMultipleActionClick(action)}
                              disabled={action.disabled}
                            >
                              {action.icon}
                            </button>
                          </Tooltip>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className={`${contentClassName} table-body`}>
                  <table className="table-content">
                    <Columns
                      entity={entity}
                      columns={columns}
                      onSortCallback={onSort}
                      hasAction={!!actions}
                      selectionState={selectionState}
                      onToggleAllRows={onToggleAllRows}
                    />
                    <tbody>
                      <Rows
                        data={data}
                        actions={actions}
                        columns={columns}
                        softDeleteProperty={softDeleteProperty}
                        selectedRows={selectedRows}
                        onRowSelectionChange={onRowSelectionChange}
                      />
                    </tbody>
                  </table>
                </div>

                <Footer />
              </>
            ) : (
              <TableEmpty />
            )}
          </>
        ) : (
          <Loading className="table-loading" />
        )}
      </div>
    </FiltersProvider>
  );
}
