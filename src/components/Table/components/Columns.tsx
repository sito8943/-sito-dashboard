import { useMemo } from "react";

// providers
import { useTranslation, useTableOptions } from "providers";

// models
import { SortOrder } from "lib";

// components
import { ChevronDown, ChevronUp } from "components/SvgIcons";

// types
import { ColumnPropsType } from "./types";

/**
 * Columns component
 * @param {object} props properties for the columns
 * @returns Row of columns
 */
export function Columns(props: ColumnPropsType) {
  const { t } = useTranslation();

  const { entity = "", columns = [], hasAction = true, onSortCallback } = props;

  const { onSort, sortingOrder, sortingBy } = useTableOptions();

  const parsedColumns = useMemo(() => {
    return columns
      .filter((column) => column.display !== "none")
      ?.map((column) => ({
        id: column.key,
        label: column.label,
        className: column.className ?? "",
        sortable: column.sortable ?? true,
        sortOptions: column.sortOptions,
      }));
  }, [columns, entity, t]);

  return (
    <thead className="table-headers-row">
      <tr>
        {parsedColumns.map((column) => (
          <th
            key={column.id}
            scope="col"
            className={`table-headers-column ${column.className}`}
          >
            <button
              disabled={!column.sortable}
              onClick={() => onSort(column.id, onSortCallback)}
              className="table-headers-cell"
            >
              <span className="table-headers-label">{column.label}</span>
              {column.sortable && (
                <span
                  className={`${sortingBy === column.id ? "table-headers-sort-on" : "table-headers-sort"}`}
                >
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
            </button>
          </th>
        ))}
        {hasAction && (
          <th scope="col" className="table-headers-action">
            {t("_accessibility:labels.actions")}
          </th>
        )}
      </tr>
    </thead>
  );
}
