/* @vitest-environment jsdom */

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BaseDto } from "lib";
import { TableOptionsProvider, TranslationProvider } from "providers";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ColumnType } from "./components";
import { Table } from "./Table";

type Row = BaseDto & {
  name: string;
};

const rows: Row[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const columns: ColumnType<Row>[] = [{ key: "name", label: "Name" }];

const translations: Record<string, string> = {
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all rows",
  "_accessibility:labels.actions": "Actions",
  "_accessibility:components.table.jumpToPage": "Jump to page",
};

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === "_accessibility:components.table.selectedCount") {
    const count = typeof options?.count === "number" ? options.count : 0;
    return `Selected ${count}`;
  }

  return translations[key] ?? key;
};

type TableHarnessProps = {
  onRowSelect?: (row: Row, selected: boolean) => void;
  onSelectedRowsChange?: (rows: Row[]) => void;
};

const TableHarness = (props: TableHarnessProps) => {
  const { onRowSelect, onSelectedRowsChange } = props;

  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <Table<Row>
          entity="users"
          data={rows}
          columns={columns}
          onRowSelect={onRowSelect}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      </TableOptionsProvider>
    </TranslationProvider>
  );
};

const ShrinkableTableHarness = (props: TableHarnessProps) => {
  const { onRowSelect, onSelectedRowsChange } = props;
  const [currentRows, setCurrentRows] = useState(rows);

  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <button type="button" onClick={() => setCurrentRows([rows[0]])}>
          Shrink data
        </button>
        <Table<Row>
          entity="users"
          data={currentRows}
          columns={columns}
          onRowSelect={onRowSelect}
          onSelectedRowsChange={onSelectedRowsChange}
        />
      </TableOptionsProvider>
    </TranslationProvider>
  );
};

describe("Table row selection", () => {
  afterEach(() => {
    cleanup();
  });

  it("selects and deselects a row and reports selected rows", async () => {
    const onRowSelect = vi.fn();
    const onSelectedRowsChange = vi.fn();

    render(
      <TableHarness
        onRowSelect={onRowSelect}
        onSelectedRowsChange={onSelectedRowsChange}
      />,
    );

    const [firstRowCheckbox] = screen.getAllByLabelText("Select row");

    fireEvent.click(firstRowCheckbox);

    expect(onRowSelect).toHaveBeenCalledWith(rows[0], true);
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([rows[0]]),
    );
    expect(screen.getByText("Selected 1")).toBeTruthy();

    fireEvent.click(firstRowCheckbox);

    expect(onRowSelect).toHaveBeenLastCalledWith(rows[0], false);
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([]),
    );
  });

  it("toggles all rows from the header checkbox", async () => {
    const onSelectedRowsChange = vi.fn();

    render(<TableHarness onSelectedRowsChange={onSelectedRowsChange} />);

    const selectAll = screen.getByLabelText("Select all rows");

    fireEvent.click(selectAll);
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith(rows),
    );

    fireEvent.click(selectAll);
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([]),
    );
  });

  it("keeps only existing selected ids when data changes", async () => {
    const onSelectedRowsChange = vi.fn();

    render(
      <ShrinkableTableHarness onSelectedRowsChange={onSelectedRowsChange} />,
    );

    fireEvent.click(screen.getByLabelText("Select all rows"));
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith(rows),
    );

    fireEvent.click(screen.getByRole("button", { name: "Shrink data" }));
    await waitFor(() =>
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith([rows[0]]),
    );
  });
});
