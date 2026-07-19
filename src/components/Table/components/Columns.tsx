// components
import { Button } from "components";
import { ChevronDown, ChevronUp } from "components/SvgIcons";
// models
import { BaseDto, classNames, SortOrder } from "lib";
// providers
import { useTableOptions, useTranslation } from "providers";
import { getNextSortingOrder } from "providers/TableOptions/utils";
import { useEffect, useMemo, useRef } from "react";

// utils
import { getSortedVisibleColumns } from "../utils";
// types
import { ColumnPropsType } from "./types";

/**
 * Columns component
 * @param {object} props properties for the columns
 * @returns Row of columns
 */
export function Columns<TRow extends BaseDto>(props: ColumnPropsType<TRow>) {
  const { t } = useTranslation();

  const {
    entity = "",
    columns = [],
    hasAction = true,
    showSortPreviewOnHover = false,
    onSortCallback,
    selectionState,
    onToggleAllRows,
  } = props;

  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    headerCheckboxRef.current.indeterminate = Boolean(
      selectionState?.hasSomeSelected && !selectionState?.allSelected,
    );
  }, [selectionState]);

  const { onSort, sortingOrder, sortingBy, hiddenColumns } = useTableOptions<
    string,
    Extract<keyof TRow, string>
  >();

  const parsedColumns = useMemo(() => {
    return getSortedVisibleColumns(columns, hiddenColumns).map((column) => ({
      id: column.key,
      label: column.label,
      renderHead: column.renderHead,
      className: column.className ?? "",
      sortable: column.sortable ?? true,
      sortOptions: column.sortOptions,
    }));
  }, [columns, entity, t, hiddenColumns]);

  return (
    <thead className="table-headers-row">
      <tr>
        <th scope="col" className="table-headers-column table-headers-checkbox">
          {onToggleAllRows ? (
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={selectionState?.allSelected ?? false}
              onChange={onToggleAllRows}
              aria-label={t("_accessibility:components.table.selectAllRows")}
            />
          ) : null}
        </th>
        {hasAction && (
          <th scope="col" className="table-headers-action">
            <span>{t("_accessibility:labels.actions")}</span>
          </th>
        )}
        {parsedColumns.map((column) => {
          const isActiveSort = sortingBy === column.id;
          const displayedSortOrder = isActiveSort
            ? sortingOrder
            : getNextSortingOrder(sortingBy, sortingOrder, column.id);
          const canShowSortPreview = showSortPreviewOnHover && !isActiveSort;
          let sortStateClassName = "table-headers-sort-placeholder";
          if (isActiveSort) {
            sortStateClassName = "table-headers-sort-current";
          } else if (canShowSortPreview) {
            sortStateClassName = "table-headers-sort-preview";
          }

          return (
            <th
              key={column.id}
              scope="col"
              className={classNames("table-headers-column", column.className)}
            >
              <Button
                disabled={!column.sortable}
                onClick={() => onSort(column.id, onSortCallback)}
                className={classNames(
                  "table-headers-cell",
                  column.sortable &&
                    canShowSortPreview &&
                    "table-headers-sort-preview-trigger",
                )}
              >
                {column.renderHead ? (
                  column.renderHead()
                ) : (
                  <span className="table-headers-label">{column.label}</span>
                )}
                {column.sortable && (
                  <span
                    className={classNames(
                      "table-headers-sort-state",
                      sortStateClassName,
                    )}
                    data-sort-order={displayedSortOrder}
                  >
                    {displayedSortOrder === SortOrder.ASC
                      ? (column.sortOptions?.icons?.asc ?? (
                          <ChevronUp
                            className={
                              column.sortOptions?.icons?.className ??
                              "table-headers-sort-indicator"
                            }
                          />
                        ))
                      : (column.sortOptions?.icons?.desc ?? (
                          <ChevronDown
                            className={
                              column.sortOptions?.icons?.className ??
                              "table-headers-sort-indicator"
                            }
                          />
                        ))}
                  </span>
                )}
              </Button>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
