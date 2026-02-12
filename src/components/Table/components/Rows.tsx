import { useMemo } from "react";

// components
import { Tooltip } from "components";

// types
import { RowsPropsType } from "./types";

// lib
import { BaseDto } from "lib";

// providers
import { useTranslation } from "providers";

const baseRender = (value: any) => value;

export const Rows = <TRow extends BaseDto>(props: RowsPropsType<TRow>) => {
  const { t } = useTranslation();
  const {
    columns,
    softDeleteProperty = "deletedAt",
    data,
    actions,
    selectedRows,
    onRowSelectionChange,
  } = props;

  const visibleColumns = useMemo(
    () =>
      columns
        .sort((colA, colB) => {
          return (colB.pos ?? 0) - (colA.pos ?? 0);
        })
        .filter((column) => column.display !== "none"),
    [columns]
  );

  return data?.map((row) => {
    const isSelected = selectedRows.has(row.id);

    return (
      <tr
        key={row.id}
        className={`table-row ${
          row[softDeleteProperty] ? "deleted-class" : ""
        } ${isSelected ? "selected" : ""}`}
      >
        <td className="table-row-cell table-row-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
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
                    <button onClick={() => action.onClick(row)}>
                      {action.icon}
                    </button>
                  </Tooltip>
                ))}
            </div>
          </td>
        ) : null}
      </tr>
    );
  });
};

export default Rows;
