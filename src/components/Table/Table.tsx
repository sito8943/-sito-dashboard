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
    contentClassName = "h-[calc(100vh-280px)]",
    className = "bg-gray-50",
    columnsOptions,
    softDeleteProperty = "deleted",
  } = props;

  const parsedRows = useMemo(
    () => rows?.map((row) => parseRows(row)) ?? [],
    [parseRows, rows, t]
  );

  return (
    <div className={`${className} relative overflow-x-auto w-full h-full`}>
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mx-5">{title}</h1>
          {rows?.length && !isLoading ? <PageSize /> : null}
        </div>
      </div>
      {!isLoading ? (
        <div className={`${contentClassName} overflow-auto`}>
          {rows?.length ? (
            <>
              <table className="w-full text-sm text-left text-gray-500">
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
                      className={`border-b ${row[softDeleteProperty]?.value ? "deleted-class" : "bg-white"}`}
                    >
                      {columns?.map((column, i) => (
                        <td
                          key={column.key}
                          className={`px-6 py-4 font-medium ${i === 0 ? "text-gray-900 whitespace-nowrap" : ""} ${columnsOptions?.columnClassNames ? columnsOptions?.columnClassNames[column.key] : ""}`}
                        >
                          {row[column.key]?.render ?? row[column.key]}
                        </td>
                      ))}
                      {!!actions ? (
                        <td>
                          <div className="flex items-center gap-3 w-full justify-center">
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
              <Navigation />
            </>
          ) : (
            <Empty />
          )}
        </div>
      ) : (
        <Loading className="bg-white top-0 left-0 w-full h-full" />
      )}
    </div>
  );
}
