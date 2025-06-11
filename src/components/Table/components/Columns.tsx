import { useMemo } from "react";

// providers
import { useTranslation } from "providers";

// hooks
import { useTableOptions } from "../hooks/TableOptionsProvider";

// models
import { SortOrder } from "lib";

// components
import { ChevronDown, ChevronUp } from "components/Chevron";

// types
import { ColumnPropTypes } from "../types";

/**
 * Columns component
 * @param {object} props properties for the columns
 * @returns Row of columns
 */
export function Columns(props: ColumnPropTypes) {
  const { t } = useTranslation();

  const { entity = "", columns = [], hasAction = true, columnsOptions } = props;

  const { onSort, sortingOrder, sortingBy } = useTableOptions();

  const parsedColumns = useMemo(() => {
    const { noSortableColumns = {}, columnClassNames = {} } =
      columnsOptions ?? {};
    return columns?.map((column) => ({
      id: column.key,
      label: column.label,
      className: columnClassNames[column.key] ?? "",
      sortable: !noSortableColumns[column.key],
    }));
  }, [columns, columnsOptions, entity, t]);

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
              onClick={() => onSort(column.id)}
              className="table-headers-cell"
            >
              <span className="table-headers-label">{column.label}</span>
              {column.sortable && (
                <span
                  className={`${sortingBy === column.id ? "table-headers-sort-on" : "table-headers-sort"}`}
                >
                  {sortingOrder === SortOrder.ASC
                    ? (columnsOptions?.icons?.asc ?? (
                        <ChevronUp
                          className={
                            columnsOptions?.icons?.className ??
                            "table-headers-sort-indicator"
                          }
                        />
                      ))
                    : (columnsOptions?.icons?.desc ?? (
                        <ChevronDown
                          className={
                            columnsOptions?.icons?.className ??
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
