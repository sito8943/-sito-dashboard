import { useMemo } from "react";

// components
import { Loading } from "components";

// table components
import {
  Empty,
  Columns,
  PageSize,
  Navigation,
  FilterPopup,
  Rows,
} from "./components/";

// types
import { TablePropsType } from "./types";

// lib
import { FilterType } from "lib";

// styles
import "./styles.css";
import "./components/styles.css";

export function Table(props: TablePropsType) {
  const {
    title = "",
    data,
    onSort,
    entity = "",
    isLoading = false,
    actions,
    columns = [],
    contentClassName = "",
    className = "",
    softDeleteProperty = "deleted",
  } = props;

  const parsedFilters = useMemo(() => {
    if (columns)
      return columns
        .sort((colA, colB) => {
          return (colB.pos ?? 0) - (colA.pos ?? 0);
        })
        .filter((column) => !!column.filterOptions)
        .map((column) => ({
          ...column.filterOptions,
          label: column.filterOptions?.label ?? column.label,
          propertyName: column.key,
        }));
    return [];
  }, [columns]);

  const isEmpty = useMemo(() => !data?.length, [data]);

  return (
    <div className={`${className} table-main`}>
      <div className="table-header">
        <h1 className="table-header-title">{title}</h1>
        {!isEmpty && !isLoading ? (
          <div className="table-header-right">
            <PageSize />
            <FilterPopup filters={parsedFilters as FilterType[]} />
          </div>
        ) : null}
      </div>
      {!isLoading ? (
        <>
          {!isEmpty ? (
            <>
              <div className={`${contentClassName} table-body`}>
                <table className="table-content">
                  <Columns
                    entity={entity}
                    columns={columns}
                    onSortCallback={onSort}
                    hasAction={!!actions}
                  />
                  <tbody>
                    <Rows
                      data={data}
                      actions={actions}
                      columns={columns}
                      softDeleteProperty={softDeleteProperty}
                    />
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
