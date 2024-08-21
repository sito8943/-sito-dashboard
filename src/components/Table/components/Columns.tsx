import { useMemo } from "react";

// providers
import { useTranslation } from "providers";

// hooks
import { useTableOptions } from "../hooks/TableOptionsProvider";

// models
import { SortOrder } from "../../../lib/models/query";

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
    <thead className="text-xs text-gray-700 bg-gray-50">
      <tr>
        {parsedColumns.map((column) => (
          <th
            key={column.id}
            scope="col"
            className={`px-6 py-3 ${column.className}`}
          >
            <button
              disabled={!column.sortable}
              onClick={() => onSort(column.id)}
              className="flex items-center gap-2"
            >
              <span className="whitespace-nowrap">{column.label}</span>
              {column.sortable && (
                <span
                  className={`${sortingBy === column.id ? "opacity-100" : "opacity-0"}`}
                >
                  {sortingOrder === SortOrder.ASC
                    ? (columnsOptions?.icons?.asc ?? (
                        <ChevronUp
                          className={columnsOptions?.icons?.className ?? "w-3"}
                        />
                      ))
                    : (columnsOptions?.icons?.desc ?? (
                        <ChevronDown
                          className={columnsOptions?.icons?.className ?? "w-3"}
                        />
                      ))}
                </span>
              )}
            </button>
          </th>
        ))}
        {hasAction && (
          <th scope="col" className="px-6 py-3 text-center">
            {t("_accessibility:labels.actions")}
          </th>
        )}
      </tr>
    </thead>
  );
}
