import { useMemo } from "react";

// providers
import { useTranslation } from "../../providers";

// components
import { Tooltip } from "components/Tooltip/Tooltip";
import { Loading } from "components/Loading";

// table components
import { Empty } from "./components/Empty";
import { Columns } from "./components/Columns";
import { PageSize } from "./components/PageSize";
import { Navigation } from "./components/Navigation";

// types
import { TablePropsType } from "./types";

// styles
import "./styles.css";
import "./components/styles.css";

export function Table(props: TablePropsType) {
  const { t } = useTranslation();

  const {
    title = "",
    rows,
    parseRows,
    entity = "",
    isLoading = false,
    actions,
    columns = [],
    contentClassName = "",
    className = "",
    columnsOptions,
    softDeleteProperty = "deleted",
  } = props;

  const parsedRows = useMemo(
    () => rows?.map((row) => parseRows(row)) ?? [],
    [parseRows, rows, t]
  );

  return (
    <div className={`${className} table-main`}>
      <div className="table-header">
        <div>
          <h1 className="table-header-title">{title}</h1>
          {rows?.length && !isLoading ? <PageSize /> : null}
        </div>
      </div>
      {!isLoading ? (
        <>
          {rows?.length ? (
            <>
              <div className={`${contentClassName} table-body`}>
                <table className="table-content">
                  <Columns
                    entity={entity}
                    columns={columns}
                    columnsOptions={columnsOptions}
                    hasAction={!!actions}
                  />
                  <tbody>
                    {parsedRows?.map((row) => (
                      <tr
                        key={row.id}
                        className={`table-row ${row[softDeleteProperty]?.value ? "deleted-class" : ""}`}
                      >
                        {columns?.map((column, i) => (
                          <td
                            key={column.key}
                            className={`table-row-cell ${i === 0 ? "basic" : ""} ${columnsOptions?.columnClassNames ? columnsOptions?.columnClassNames[column.key] : ""}`}
                          >
                            {row[column.key]?.render ?? row[column.key]}
                          </td>
                        ))}
                        {!!actions ? (
                          <td>
                            <div className="table-row-cell-action">
                              {actions(row)
                                .filter((action) => !action.hidden)
                                ?.map((action) => (
                                  <Tooltip
                                    key={action.id}
                                    content={action.tooltip}
                                  >
                                    <button onClick={action.onClick}>
                                      {action.icon}
                                    </button>
                                  </Tooltip>
                                ))}
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Navigation />
            </>
          ) : (
            <Empty />
          )}
        </>
      ) : (
        <Loading className="table-loading" />
      )}
    </div>
  );
}
