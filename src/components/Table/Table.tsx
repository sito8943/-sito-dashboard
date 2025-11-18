import { useMemo } from "react";

// components
import { Loading } from "components";

// table components
import { TableEmpty, Columns, Footer, Rows, TableHeader } from "./components/";

// providers
import { FiltersProvider } from "providers";

// types
import { TablePropsType } from "./types";

// lib
import { BaseDto, FilterType } from "lib";

// styles
import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

export function Table<TRow extends BaseDto>(props: TablePropsType<TRow>) {
  const {
    data,
    onSort,
    entity = "",
    isLoading = false,
    actions,
    columns = [],
    contentClassName = "",
    className = "",
    softDeleteProperty = "deleted",
    ...rest
  } = props;

  const isEmpty = useMemo(() => !data?.length, [data]);

  return (
    <FiltersProvider>
      <div className={`${className} table-main`}>
        <TableHeader columns={columns} isLoading={isLoading} {...rest} />
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

                <Footer />
              </>
            ) : (
              <TableEmpty />
            )}
          </>
        ) : (
          <Loading className="table-loading" />
        )}
      </div>
    </FiltersProvider>
  );
}
