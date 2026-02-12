import { useCallback, useEffect, useMemo, useState } from "react";

// components
import { Loading } from "components";

// table components
import { TableEmpty, Columns, Footer, Rows, TableHeader } from "./components/";

// providers
import { FiltersProvider } from "providers";

// types
import { TablePropsType } from "./types";

// lib
import { BaseDto } from "lib";

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
    softDeleteProperty = "deletedAt",
    onRowSelect,
    onSelectedRowsChange,
    ...rest
  } = props;

  const [selectedRows, setSelectedRows] = useState<Set<TRow["id"]>>(new Set());

  const isEmpty = useMemo(() => !data?.length, [data]);

  useEffect(() => {
    if (!data?.length) {
      setSelectedRows(new Set());
      return;
    }

    setSelectedRows((prevSelected) => {
      const nextSelected = new Set<TRow["id"]>();
      const currentIds = new Set(data.map((row) => row.id));

      prevSelected.forEach((rowId) => {
        if (currentIds.has(rowId)) {
          nextSelected.add(rowId);
        }
      });

      return nextSelected;
    });
  }, [data]);

  const onRowSelectionChange = useCallback(
    (row: TRow) => {
      setSelectedRows((prevSelected) => {
        const nextSelected = new Set(prevSelected);
        if (nextSelected.has(row.id)) {
          nextSelected.delete(row.id);
        } else {
          nextSelected.add(row.id);
        }

        onRowSelect?.(row, nextSelected.has(row.id));

        return nextSelected;
      });
    },
    [onRowSelect]
  );

  useEffect(() => {
    if (!onSelectedRowsChange) return;

    const selectedData = data?.filter((row) => selectedRows.has(row.id)) ?? [];
    onSelectedRowsChange(selectedData);
  }, [data, selectedRows, onSelectedRowsChange]);

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
                        selectedRows={selectedRows}
                        onRowSelectionChange={onRowSelectionChange}
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
