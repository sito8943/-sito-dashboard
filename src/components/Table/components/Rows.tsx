// components
import { Tooltip } from "components";

// types
import { RowsPropsType } from "./types";
import { useMemo } from "react";

const baseRender = (value: any) => value;

export const Rows = (props: RowsPropsType) => {
  const { columns, softDeleteProperty, data, actions } = props;

  const visibleColumns = useMemo(
    () => columns.filter((column) => column.display !== "none"),
    [columns]
  );

  return data?.map((row) => (
    <tr
      key={row.id}
      className={`table-row ${row[softDeleteProperty]?.value ? "deleted-class" : ""}`}
    >
      {visibleColumns?.map((column, i) => (
        <td
          key={column.key}
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
                  <button onClick={action.onClick}>{action.icon}</button>
                </Tooltip>
              ))}
          </div>
        </td>
      ) : null}
    </tr>
  ));
};

export default Rows;
