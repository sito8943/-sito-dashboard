// components
import { IconButton } from "components";
import { CheckInput } from "components/Form";
import { TableColumns } from "components/SvgIcons";
// lib
import { BaseDto } from "lib";
// providers
import { useTableOptions, useTranslation } from "providers";
import { useCallback, useMemo, useRef, useState } from "react";

// utils
import { getSortedVisibleColumns } from "../utils";
// types
import { ColumnType } from "./types";

type ColumnVisibilityMenuPropsType<TRow extends BaseDto> = {
  columns: ColumnType<TRow>[];
};

/**
 * Renders the ColumnVisibilityMenu component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function ColumnVisibilityMenu<TRow extends BaseDto>(
  props: ColumnVisibilityMenuPropsType<TRow>,
) {
  const { columns } = props;
  const { hiddenColumns, toggleColumn } = useTableOptions();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const hideableColumns = useMemo(
    () =>
      getSortedVisibleColumns(
        columns.filter(
          (col) => col.hideable !== false && col.display !== "none",
        ),
        [],
      ),
    [columns],
  );

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleColumnToggle = useCallback(
    (key: string) => {
      toggleColumn(key);
    },
    [toggleColumn],
  );

  if (hideableColumns.length === 0) return null;

  return (
    <div className="column-visibility-menu" ref={menuRef}>
      <IconButton
        icon={<TableColumns className="column-visibility-icon" />}
        className="normal column-visibility-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <span className="table-header-sr">
          {t("_accessibility:buttons.columns")}
        </span>
      </IconButton>
      {open && (
        <>
          <div
            className="column-visibility-backdrop"
            onClick={() => setOpen(false)}
          />
          <div className="column-visibility-dropdown" role="menu">
            {hideableColumns.map((column) => (
              <CheckInput
                key={column.key}
                checked={!hiddenColumns.includes(column.key)}
                onChange={() => handleColumnToggle(column.key)}
                label={column.label ?? column.key}
                containerClassName="column-visibility-item"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
