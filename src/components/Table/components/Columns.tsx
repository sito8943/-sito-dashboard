// components
import { Button } from "components";
import { ChevronDown, ChevronUp } from "components/SvgIcons";
// models
import { BaseDto, SortOrder } from "lib";
// providers
import { useTableOptions, useTranslation } from "providers";
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

  const { onSort, sortingOrder, sortingBy } = useTableOptions();

  const parsedColumns = useMemo(() => {
    return getSortedVisibleColumns(columns).map((column) => ({
      id: column.key,
      label: column.label,
      renderHead: column.renderHead,
      className: column.className ?? "",
      sortable: column.sortable ?? true,
      sortOptions: column.sortOptions,
    }));
  }, [columns, entity, t]);

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
        {parsedColumns.map((column) => (
          <th
            key={column.id as string}
            scope="col"
            className={`table-headers-column ${column.className}`}
          >
            <Button
              disabled={!column.sortable}
              onClick={() => onSort(column.id as string, onSortCallback)}
              className="table-headers-cell"
            >
              {column.renderHead ? (
                column.renderHead()
              ) : (
                <span className="table-headers-label">{column.label}</span>
              )}
              {column.sortable && sortingBy === column.id && (
                <span>
                  {sortingOrder === SortOrder.ASC
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
        ))}
      </tr>
    </thead>
  );
}
