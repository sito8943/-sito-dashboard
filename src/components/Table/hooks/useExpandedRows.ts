// lib
import { BaseDto } from "lib";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// types
import { ExpandedRowStateType } from "../components/types";

const EXPANDED_ROW_ANIMATION_MS = 220;

interface UseExpandedRowsParams<TRow extends BaseDto> {
  data: TRow[];
  allowMultipleExpandedRows: boolean;
  controlledExpandedRowId: TRow["id"] | null | undefined;
  onExpandedRowChange?: (
    expandedRow: TRow | null,
    collapsedRow: TRow | null,
  ) => void;
  onRowExpand?: (expandedRow: TRow, collapsedRow: TRow | null) => ReactNode;
  findRowById: (rowId: TRow["id"] | null) => TRow | null;
}

/**
 * Manages expand/collapse state and CSS transition animations for table rows.
 * Supports both single and multiple expanded rows, as well as controlled mode via `controlledExpandedRowId`.
 * @param root0 - Hook parameters.
 * @param root0.data - Array of row data; used to clean up expanded state when rows are removed.
 * @param root0.allowMultipleExpandedRows - When true, multiple rows can be expanded simultaneously.
 * @param root0.controlledExpandedRowId - When provided, the expanded row is controlled externally.
 * @param root0.onExpandedRowChange - Optional callback fired when a row is expanded or collapsed.
 * @param root0.onRowExpand - Callback that returns the content to render inside an expanded row.
 * @param root0.findRowById - Helper to look up a row by its id.
 * @returns expandedRowsToRender — list of rows currently rendered with animation state, and onRowExpandChange — click handler for row expansion.
 */
export function useExpandedRows<TRow extends BaseDto>({
  data,
  allowMultipleExpandedRows,
  controlledExpandedRowId,
  onExpandedRowChange,
  onRowExpand,
  findRowById,
}: UseExpandedRowsParams<TRow>) {
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

  return { expandedRowsToRender, onRowExpandChange };
}
