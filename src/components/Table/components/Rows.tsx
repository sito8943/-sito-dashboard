import { useMemo } from "react";

// components
import { Tooltip } from "components";

// types
import { RowsPropsType } from "./types";

// lib
import { BaseDto } from "lib";

const baseRender = (value: any) => value;

export const Rows = <TRow extends BaseDto>(props: RowsPropsType<TRow>) => {
  const { columns, softDeleteProperty = "deleted", data, actions } = props;

  const visibleColumns = useMemo(
    () =>
      columns
        .sort((colA, colB) => {
          return (colB.pos ?? 0) - (colA.pos ?? 0);
        })
        .filter((column) => column.display !== "none"),
    [columns]
  );

  return data?.map((row) => (
    <tr
      key={row.id}
      className={`table-row ${row[softDeleteProperty] ? "deleted-class" : ""}`}
    >
      {visibleColumns?.map((column, i) => (
        <td
          key={column.key as string}
          className={`table-row-cell ${i === 0 ? "basic" : ""} ${column.className ?? ""}`}
        >
          {column.renderBody
            ? column.renderBody(row[column.key], row)
            : baseRender(row[column.key])}
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
  ));
};

export default Rows;
