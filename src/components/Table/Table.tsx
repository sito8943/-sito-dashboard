import { useMemo } from "react";
import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";

// components
import { Loading } from "../Loading";

// table components
import { Empty } from "./Empty";
import { Columns } from "./Columns";
import { PageSize } from "./PageSize";
import { Navigation } from "./Navigation";

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
    actions = [],
    columns = [],
    contentClassName = "h-[calc(100vh-280px)]",
    className = "bg-gray-50",
    columnsOptions,
  } = props;

  const parsedRows = useMemo(
    () => rows?.map((row) => parseRows(row)) ?? [],
    [parseRows, rows, t]
  );

  return (
    <div className={`${className} relative overflow-x-auto w-full h-full`}>
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {rows?.length && !isLoading && <PageSize />}
        </div>
      </div>
      <div className={`${contentClassName} overflow-auto`}>
        {!rows?.length && !isLoading ? (
          <Empty />
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <Columns
              entity={entity}
              columns={columns}
              columnsOptions={columnsOptions}
              hasAction={actions?.length > 0}
            />
            {!isLoading && Boolean(rows?.length) && (
              <tbody>
                {parsedRows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b ${row.deleted.value ? "bg-secondary/10" : "bg-white"}`}
                  >
                    {columns.map((column, i) => (
                      <td
                        key={column}
                        className={`px-6 py-4 font-medium ${i === 0 ? "text-gray-900 whitespace-nowrap" : ""} ${columnsOptions?.columnClassNames ? columnsOptions?.columnClassNames[column] : ""}`}
                      >
                        {row[column]?.render ?? row[column]}
                      </td>
                    ))}
                    {Boolean(actions.length) && (
                      <td>
                        <div className="flex items-center gap-3 w-full justify-center">
                          {actions
                            .filter(
                              (action) => !action.hidden || !action.hidden(row)
                            )
                            .map((action) => (
                              <Tippy key={action.id} content={action.tooltip}>
                                <button onClick={() => action.onClick(row)}>
                                  {action.icon}
                                </button>
                              </Tippy>
                            ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      {isLoading && <Loading className="bg-white top-0 left-0 w-full h-full" />}
      {!isLoading && rows?.length && <Navigation />}
    </div>
  );
}
