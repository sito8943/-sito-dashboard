// styles
import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

// components
import { Loading, Tooltip } from "components";
// lib
import { BaseDto } from "lib";
// providers
import { FiltersProvider, useTranslation } from "providers";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// table components
import {
  Columns,
  ExpandedRowStateType,
  Footer,
  Rows,
  TableEmpty,
  TableHeader,
} from "./components/";
// types
import { ActionType, TablePropsType } from "./types";

const EXPANDED_ROW_ANIMATION_MS = 220;

/**
 * Renders the Table component.
 * @param props - props parameter.
 * @returns Function result.
 */
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
    allowMultipleExpandedRows = false,
    expandedRowId: controlledExpandedRowId,
    onExpandedRowChange,
    onRowExpand,
    ...rest
  } = props;

  const { t } = useTranslation();

  const [selectedRows, setSelectedRows] = useState<Set<TRow["id"]>>(new Set());
  const [internalExpandedRowId, setInternalExpandedRowId] = useState<
    TRow["id"] | null
  >(null);
  const [expandedRowContent, setExpandedRowContent] = useState<ReactNode>(null);
  const [renderedExpandedRowId, setRenderedExpandedRowId] = useState<
    TRow["id"] | null
  >(null);
  const [renderedExpandedRowContent, setRenderedExpandedRowContent] =
    useState<ReactNode>(null);
  const [isExpandedRowVisible, setIsExpandedRowVisible] = useState(false);
  const [internalExpandedRowIds, setInternalExpandedRowIds] = useState<
    Set<TRow["id"]>
  >(new Set());
  const [renderedExpandedRows, setRenderedExpandedRows] = useState<
    ExpandedRowStateType<TRow>[]
  >([]);
  const previousControlledExpandedRowRef = useRef<TRow | null>(null);
  const expandedRowAnimationTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const expandedRowsAnimationTimeoutRef = useRef<
    Map<TRow["id"], ReturnType<typeof setTimeout>>
  >(new Map());

  const isExpandedRowControlled =
    typeof controlledExpandedRowId !== "undefined";
  const isMultipleExpandedRowsEnabled =
    allowMultipleExpandedRows && !isExpandedRowControlled;
  const expandedRowId = isExpandedRowControlled
    ? (controlledExpandedRowId ?? null)
    : internalExpandedRowId;

  const isEmpty = useMemo(() => !data?.length, [data]);

  const selectedRowsData = useMemo(
    () => data?.filter((row) => selectedRows.has(row.id)) ?? [],
    [data, selectedRows],
  );

  const findRowById = useCallback(
    (rowId: TRow["id"] | null): TRow | null => {
      if (rowId === null) return null;
      return data.find((row) => row.id === rowId) ?? null;
    },
    [data],
  );

  const clearExpandedRowAnimationTimeout = useCallback(() => {
    if (!expandedRowAnimationTimeoutRef.current) return;
    clearTimeout(expandedRowAnimationTimeoutRef.current);
    expandedRowAnimationTimeoutRef.current = null;
  }, []);

  const clearExpandedRowsAnimationTimeout = useCallback(
    (rowId?: TRow["id"]) => {
      if (typeof rowId !== "undefined") {
        const timeoutId = expandedRowsAnimationTimeoutRef.current.get(rowId);
        if (!timeoutId) return;
        clearTimeout(timeoutId);
        expandedRowsAnimationTimeoutRef.current.delete(rowId);
        return;
      }

      expandedRowsAnimationTimeoutRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId),
      );
      expandedRowsAnimationTimeoutRef.current.clear();
    },
    [],
  );

  const collapseRenderedRow = useCallback(
    (rowId: TRow["id"]) => {
      clearExpandedRowsAnimationTimeout(rowId);

      setRenderedExpandedRows((prevRows) => {
        const hasRow = prevRows.some(
          (expandedRow) => expandedRow.rowId === rowId,
        );
        if (!hasRow) return prevRows;

        return prevRows.map((expandedRow) =>
          expandedRow.rowId === rowId
            ? { ...expandedRow, isVisible: false }
            : expandedRow,
        );
      });

      expandedRowsAnimationTimeoutRef.current.set(
        rowId,
        setTimeout(() => {
          setRenderedExpandedRows((prevRows) =>
            prevRows.filter((expandedRow) => expandedRow.rowId !== rowId),
          );
          expandedRowsAnimationTimeoutRef.current.delete(rowId);
        }, EXPANDED_ROW_ANIMATION_MS),
      );
    },
    [clearExpandedRowsAnimationTimeout],
  );

  const expandRenderedRow = useCallback(
    (rowId: TRow["id"], content: ReactNode) => {
      clearExpandedRowsAnimationTimeout(rowId);

      setRenderedExpandedRows((prevRows) => {
        const hasRow = prevRows.some(
          (expandedRow) => expandedRow.rowId === rowId,
        );
        if (!hasRow) {
          return [...prevRows, { rowId, content, isVisible: false }];
        }

        return prevRows.map((expandedRow) =>
          expandedRow.rowId === rowId
            ? { ...expandedRow, content, isVisible: false }
            : expandedRow,
        );
      });

      requestAnimationFrame(() => {
        setRenderedExpandedRows((prevRows) =>
          prevRows.map((expandedRow) =>
            expandedRow.rowId === rowId
              ? { ...expandedRow, isVisible: true }
              : expandedRow,
          ),
        );
      });
    },
    [clearExpandedRowsAnimationTimeout],
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
    if (!isMultipleExpandedRowsEnabled) return;

    const currentIds = new Set(data.map((row) => row.id));

    setInternalExpandedRowIds((prevExpandedRows) => {
      const nextExpandedRows = new Set<TRow["id"]>();
      prevExpandedRows.forEach((rowId) => {
        if (currentIds.has(rowId)) {
          nextExpandedRows.add(rowId);
          return;
        }

        clearExpandedRowsAnimationTimeout(rowId);
      });

      return nextExpandedRows;
    });

    setRenderedExpandedRows((prevRows) => {
      prevRows.forEach((expandedRow) => {
        if (!currentIds.has(expandedRow.rowId)) {
          clearExpandedRowsAnimationTimeout(expandedRow.rowId);
        }
      });

      return prevRows.filter((expandedRow) =>
        currentIds.has(expandedRow.rowId),
      );
    });
  }, [data, isMultipleExpandedRowsEnabled, clearExpandedRowsAnimationTimeout]);

  useEffect(() => {
    if (isMultipleExpandedRowsEnabled) return;

    if (expandedRowId === null) {
      setExpandedRowContent(null);
      if (isExpandedRowControlled) {
        previousControlledExpandedRowRef.current = null;
      }
      return;
    }

    const expandedRow = findRowById(expandedRowId);
    if (!expandedRow) {
      if (!isExpandedRowControlled) {
        setInternalExpandedRowId(null);
      }
      setExpandedRowContent(null);
      if (isExpandedRowControlled) {
        previousControlledExpandedRowRef.current = null;
      }
    }
  }, [
    data,
    expandedRowId,
    findRowById,
    isExpandedRowControlled,
    isMultipleExpandedRowsEnabled,
  ]);

  useEffect(() => {
    if (isMultipleExpandedRowsEnabled) return;

    clearExpandedRowAnimationTimeout();

    if (expandedRowId === null || expandedRowContent === null) {
      if (renderedExpandedRowId === null) {
        setIsExpandedRowVisible(false);
        setRenderedExpandedRowContent(null);
        return;
      }

      setIsExpandedRowVisible(false);
      expandedRowAnimationTimeoutRef.current = setTimeout(() => {
        setRenderedExpandedRowId(null);
        setRenderedExpandedRowContent(null);
        expandedRowAnimationTimeoutRef.current = null;
      }, EXPANDED_ROW_ANIMATION_MS);
      return;
    }

    if (renderedExpandedRowId === null) {
      setRenderedExpandedRowId(expandedRowId);
      setRenderedExpandedRowContent(expandedRowContent);
      requestAnimationFrame(() => setIsExpandedRowVisible(true));
      return;
    }

    if (renderedExpandedRowId === expandedRowId) {
      setRenderedExpandedRowContent(expandedRowContent);
      requestAnimationFrame(() => setIsExpandedRowVisible(true));
      return;
    }

    setIsExpandedRowVisible(false);
    expandedRowAnimationTimeoutRef.current = setTimeout(() => {
      setRenderedExpandedRowId(expandedRowId);
      setRenderedExpandedRowContent(expandedRowContent);
      requestAnimationFrame(() => setIsExpandedRowVisible(true));
      expandedRowAnimationTimeoutRef.current = null;
    }, EXPANDED_ROW_ANIMATION_MS);
  }, [
    clearExpandedRowAnimationTimeout,
    expandedRowContent,
    expandedRowId,
    isMultipleExpandedRowsEnabled,
    renderedExpandedRowId,
  ]);

  useEffect(
    () => () => {
      clearExpandedRowAnimationTimeout();
      clearExpandedRowsAnimationTimeout();
    },
    [clearExpandedRowAnimationTimeout, clearExpandedRowsAnimationTimeout],
  );

  useEffect(() => {
    if (!isExpandedRowControlled) return;
    if (expandedRowId === null) {
      setExpandedRowContent(null);
      previousControlledExpandedRowRef.current = null;
      return;
    }

    const expandedRow = findRowById(expandedRowId);
    if (!expandedRow) {
      setExpandedRowContent(null);
      previousControlledExpandedRowRef.current = null;
      return;
    }

    const collapsedRow = previousControlledExpandedRowRef.current;
    setExpandedRowContent(onRowExpand?.(expandedRow, collapsedRow) ?? null);
    previousControlledExpandedRowRef.current = expandedRow;
  }, [expandedRowId, findRowById, isExpandedRowControlled, onRowExpand]);

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

  const onRowExpandChange = useCallback(
    (row: TRow) => {
      if (isMultipleExpandedRowsEnabled) {
        const isCollapsingCurrent = internalExpandedRowIds.has(row.id);

        if (isCollapsingCurrent) {
          setInternalExpandedRowIds((prevExpandedRows) => {
            const nextExpandedRows = new Set(prevExpandedRows);
            nextExpandedRows.delete(row.id);
            return nextExpandedRows;
          });
          collapseRenderedRow(row.id);
          onExpandedRowChange?.(null, row);
          return;
        }

        setInternalExpandedRowIds((prevExpandedRows) => {
          const nextExpandedRows = new Set(prevExpandedRows);
          nextExpandedRows.add(row.id);
          return nextExpandedRows;
        });

        const expandedRowContent = onRowExpand?.(row, null) ?? null;
        if (
          expandedRowContent !== null &&
          typeof expandedRowContent !== "undefined"
        ) {
          expandRenderedRow(row.id, expandedRowContent);
        } else {
          clearExpandedRowsAnimationTimeout(row.id);
          setRenderedExpandedRows((prevRows) =>
            prevRows.filter((expandedRow) => expandedRow.rowId !== row.id),
          );
        }

        onExpandedRowChange?.(row, null);
        return;
      }

      const isCollapsingCurrent = expandedRowId === row.id;
      const collapsedRow = isCollapsingCurrent
        ? row
        : findRowById(expandedRowId);

      if (isExpandedRowControlled) {
        onExpandedRowChange?.(isCollapsingCurrent ? null : row, collapsedRow);
        return;
      }

      if (isCollapsingCurrent) {
        setInternalExpandedRowId(null);
        setExpandedRowContent(null);
        onExpandedRowChange?.(null, row);
        return;
      }

      setInternalExpandedRowId(row.id);
      setExpandedRowContent(onRowExpand?.(row, collapsedRow) ?? null);
      onExpandedRowChange?.(row, collapsedRow);
    },
    [
      expandedRowId,
      collapseRenderedRow,
      clearExpandedRowsAnimationTimeout,
      expandRenderedRow,
      findRowById,
      internalExpandedRowIds,
      isExpandedRowControlled,
      isMultipleExpandedRowsEnabled,
      onExpandedRowChange,
      onRowExpand,
    ],
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

  useEffect(() => {
    if (!onSelectedRowsChange) return;
    onSelectedRowsChange(selectedRowsData);
  }, [selectedRowsData, onSelectedRowsChange]);

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

  const expandedRowsToRender = useMemo<ExpandedRowStateType<TRow>[]>(() => {
    if (isMultipleExpandedRowsEnabled) {
      return renderedExpandedRows;
    }

    if (
      renderedExpandedRowId === null ||
      renderedExpandedRowContent === null ||
      typeof renderedExpandedRowContent === "undefined"
    ) {
      return [];
    }

    return [
      {
        rowId: renderedExpandedRowId,
        content: renderedExpandedRowContent,
        isVisible: isExpandedRowVisible,
      },
    ];
  }, [
    isExpandedRowVisible,
    isMultipleExpandedRowsEnabled,
    renderedExpandedRowContent,
    renderedExpandedRowId,
    renderedExpandedRows,
  ]);

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
                        expandedRows={expandedRowsToRender}
                        onRowSelectionChange={onRowSelectionChange}
                        onRowExpand={
                          onRowExpand ? onRowExpandChange : undefined
                        }
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
