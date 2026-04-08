// styles
import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

// components
import { Loading } from "components";
// lib
import { BaseDto, classNames } from "lib";
// providers
import { FiltersProvider } from "providers";
import { useCallback, useMemo } from "react";

// table components
import {
  Columns,
  Footer,
  Rows,
  TableEmpty,
  TableHeader,
  TableSelectionBar,
} from "./components/";
// hooks
import {
  useExpandedRows,
  useTableMultiActions,
  useTableRowSelection,
} from "./hooks";
// types
import { TablePropsType } from "./types";

/**
 * Renders the Table component.
 * @param props - props parameter.
 * @returns Function result.
 */
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
    allowMultipleExpandedRows = false,
    expandedRowId: controlledExpandedRowId,
    onExpandedRowChange,
    onRowExpand,
    ...rest
  } = props;

  const isEmpty = useMemo(() => !data?.length, [data]);

  const findRowById = useCallback(
    (rowId: TRow["id"] | null): TRow | null => {
      if (rowId === null) return null;
      return data.find((row) => row.id === rowId) ?? null;
    },
    [data],
  );

  const {
    selectedRows,
    selectedRowsData,
    selectionState,
    onRowSelectionChange,
    onToggleAllRows,
  } = useTableRowSelection({ data, onRowSelect, onSelectedRowsChange });

  const { expandedRowsToRender, onRowExpandChange } = useExpandedRows({
    data,
    allowMultipleExpandedRows,
    controlledExpandedRowId,
    onExpandedRowChange,
    onRowExpand,
    findRowById,
  });

  const { multiActions, handleMultipleActionClick } = useTableMultiActions({
    actions,
    selectedRowsData,
  });

  return (
    <FiltersProvider>
      <div className={classNames("table-main", className)}>
        <TableHeader columns={columns} isLoading={isLoading} {...rest} />
        {!isLoading ? (
          <>
            {!isEmpty ? (
              <>
                {!!selectedRowsData.length && (
                  <TableSelectionBar
                    count={selectedRowsData.length}
                    multiActions={multiActions}
                    onActionClick={handleMultipleActionClick}
                  />
                )}
                <div className={classNames("table-body", contentClassName)}>
                  <table className="table-content">
                    <Columns
                      entity={entity}
                      columns={columns}
                      onSortCallback={onSort}
                      hasAction={!!actions}
                      selectionState={selectionState}
                      onToggleAllRows={onToggleAllRows}
                    />
                    <tbody>
                      <Rows
                        data={data}
                        actions={actions}
                        columns={columns}
                        softDeleteProperty={softDeleteProperty}
                        selectedRows={selectedRows}
                        expandedRows={expandedRowsToRender}
                        onRowSelectionChange={onRowSelectionChange}
                        onRowExpand={
                          onRowExpand ? onRowExpandChange : undefined
                        }
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
