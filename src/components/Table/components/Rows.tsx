// components
import { Tooltip } from "components";
// lib
import { BaseDto } from "lib";
// providers
import { useTranslation } from "providers";
import { Fragment, useMemo } from "react";

// types
import { RowsPropsType } from "./types";

const baseRender = (value: any) => value;

/**
 * Renders the Rows component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const Rows = <TRow extends BaseDto>(props: RowsPropsType<TRow>) => {
  const { t } = useTranslation();
  const {
    columns,
    softDeleteProperty = "deletedAt",
    data,
    actions,
    selectedRows,
    expandedRows = [],
    onRowSelectionChange,
    onRowExpand,
  } = props;

  const visibleColumns = useMemo(
    () =>
      columns
        .sort((colA, colB) => {
          return (colB.pos ?? 0) - (colA.pos ?? 0);
        })
        .filter((column) => column.display !== "none"),
    [columns],
  );

  const expandedRowsMap = useMemo(
    () =>
      new Map(
        expandedRows.map((expandedRow) => [expandedRow.rowId, expandedRow]),
      ),
    [expandedRows],
  );

  return data?.map((row) => {
    const isSelected = selectedRows.has(row.id);
    const expandedRow = expandedRowsMap.get(row.id);
    const isExpanded = !!expandedRow;
    const colSpan = visibleColumns.length + 1 + (actions ? 1 : 0);

    return (
      <Fragment key={row.id}>
        <tr
          className={`table-row ${onRowExpand ? "expandable" : ""} ${
            row[softDeleteProperty] ? "deleted-class" : ""
          } ${isSelected ? "selected" : ""} ${isExpanded ? "expanded" : ""}`}
          onClick={() => onRowExpand?.(row)}
        >
          <td className="table-row-cell table-row-checkbox">
            <input
              type="checkbox"
              checked={isSelected}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onRowSelectionChange(row)}
              aria-label={t("_accessibility:components.table.selectRow")}
            />
          </td>
          {visibleColumns?.map((column, i) => (
            <td
              key={column.key as string}
              className={`table-row-cell ${i === 0 ? "basic" : ""} ${column.className ?? ""}`}
            >
              {column.renderBody
                ? column.renderBody(row[column.key as keyof TRow], row)
                : baseRender(row[column.key as keyof TRow])}
            </td>
          ))}
          {!!actions ? (
            <td>
              <div className="table-row-cell-action">
                {actions(row)
                  .filter((action) => !action.hidden)
                  ?.map((action) => (
                    <Tooltip key={action.id} content={action.tooltip}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                      >
                        {action.icon}
                      </button>
                    </Tooltip>
                  ))}
              </div>
            </td>
          ) : null}
        </tr>
        {isExpanded &&
          expandedRow?.content !== null &&
          typeof expandedRow?.content !== "undefined" && (
            <tr className="table-row-expanded">
              <td className="table-row-expanded-cell" colSpan={colSpan}>
                <div
                  className={`table-row-expanded-content ${
                    expandedRow.isVisible ? "open" : "closed"
                  }`}
                >
                  <div className="table-row-expanded-inner">
                    {expandedRow.content}
                  </div>
                </div>
              </td>
            </tr>
          )}
      </Fragment>
    );
  });
};

export default Rows;
