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
import { TablePropsType } from "./types";

type Row = BaseDto & {
  name: string;
  age: number;
};

const rows: Row[] = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 34 },
];

const columns: ColumnType<Row>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
];

const translations: Record<string, string> = {
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all rows",
  "_accessibility:labels.actions": "Actions",
  "_accessibility:buttons.openActions": "Open actions",
  "_accessibility:components.table.jumpToPage": "Jump to page",
  "_accessibility:components.table.pageSizes": "Rows per page",
};

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === "_accessibility:components.table.selectedCount") {
    const count = typeof options?.count === "number" ? options.count : 0;
    return `Selected ${count}`;
  }

  return translations[key] ?? key;
};

const tableBaseProps = {
  entity: "users",
  data: rows,
  columns,
};

const TableWithProviders = (props: Partial<TablePropsType<Row>>) => {
  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <Table<Row> {...tableBaseProps} {...(props as any)} />
      </TableOptionsProvider>
    </TranslationProvider>
  );
};

const getExpandIndicator = (rowName: string) =>
  screen
    .getByText(rowName)
    .closest("tr")
    ?.querySelector(".table-row-expand-indicator");

describe("Table expandable rows", () => {
  afterEach(() => {
    cleanup();
  });

  it("expands rows and passes expanded/collapsed rows to callback", async () => {
    const onRowExpand = vi.fn((expandedRow: Row, collapsedRow: Row | null) => (
      <div>{`details-${expandedRow.name}-collapsed-${collapsedRow?.name ?? "none"}`}</div>
    ));
    const onExpandedRowChange = vi.fn();

    render(
      TableWithProviders({
        onRowExpand,
        onExpandedRowChange,
      }),
    );

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(onRowExpand).toHaveBeenLastCalledWith(rows[0], null),
    );
    expect(screen.getByText("details-Alice-collapsed-none")).toBeTruthy();
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(rows[0], null);

    fireEvent.click(screen.getByText("Bob"));
    await waitFor(() =>
      expect(onRowExpand).toHaveBeenLastCalledWith(rows[1], rows[0]),
    );
    await waitFor(() =>
      expect(screen.getByText("details-Bob-collapsed-Alice")).toBeTruthy(),
    );
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(rows[1], rows[0]);
  });

  it("collapses expanded row when clicking the same row again", async () => {
    const onRowExpand = vi.fn((expandedRow: Row) => (
      <div>{`details-${expandedRow.name}`}</div>
    ));
    const onExpandedRowChange = vi.fn();

    render(
      TableWithProviders({
        onRowExpand,
        onExpandedRowChange,
      }),
    );

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() => expect(screen.getByText("details-Alice")).toBeTruthy());

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(screen.queryByText("details-Alice")).toBeFalsy(),
    );

    expect(onRowExpand).toHaveBeenCalledTimes(1);
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(null, rows[0]);
  });

  it("shows chevron direction based on expanded row state", async () => {
    const onRowExpand = vi.fn((expandedRow: Row) => (
      <div>{`details-${expandedRow.name}`}</div>
    ));

    render(
      TableWithProviders({
        onRowExpand,
      }),
    );

    expect(getExpandIndicator("Alice")).toHaveAttribute(
      "data-state",
      "collapsed",
    );

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() => expect(screen.getByText("details-Alice")).toBeTruthy());

    expect(getExpandIndicator("Alice")).toHaveAttribute(
      "data-state",
      "expanded",
    );

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(screen.queryByText("details-Alice")).toBeFalsy(),
    );

    expect(getExpandIndicator("Alice")).toHaveAttribute(
      "data-state",
      "collapsed",
    );
  });

  it("does not expand row when clicking actions dropdown trigger", () => {
    const onRowExpand = vi.fn((expandedRow: Row) => (
      <div>{`details-${expandedRow.name}`}</div>
    ));
    const onActionClick = vi.fn();

    const actions = () => [
      {
        id: "menu-action",
        tooltip: "Menu action",
        icon: <span>...</span>,
        onClick: onActionClick,
      },
    ];

    render(
      TableWithProviders({
        onRowExpand,
        actions,
      }),
    );

    const aliceRow = screen.getByText("Alice").closest("tr");
    const trigger = aliceRow?.querySelector(".actions-dropdown-trigger");
    expect(trigger).toBeTruthy();

    if (!trigger) return;
    fireEvent.click(trigger);

    expect(onRowExpand).not.toHaveBeenCalled();
    expect(screen.queryByText("details-Alice")).toBeFalsy();
  });

  it("allows multiple expanded rows at the same time", async () => {
    const onRowExpand = vi.fn((expandedRow: Row, collapsedRow: Row | null) => (
      <div>{`multi-${expandedRow.name}-collapsed-${collapsedRow?.name ?? "none"}`}</div>
    ));
    const onExpandedRowChange = vi.fn();

    render(
      TableWithProviders({
        allowMultipleExpandedRows: true,
        onRowExpand,
        onExpandedRowChange,
      }),
    );

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(screen.getByText("multi-Alice-collapsed-none")).toBeTruthy(),
    );
    expect(onRowExpand).toHaveBeenNthCalledWith(1, rows[0], null);
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(rows[0], null);

    fireEvent.click(screen.getByText("Bob"));
    await waitFor(() =>
      expect(screen.getByText("multi-Bob-collapsed-none")).toBeTruthy(),
    );
    expect(screen.getByText("multi-Alice-collapsed-none")).toBeTruthy();
    expect(onRowExpand).toHaveBeenNthCalledWith(2, rows[1], null);
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(rows[1], null);

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(screen.queryByText("multi-Alice-collapsed-none")).toBeFalsy(),
    );
    expect(screen.getByText("multi-Bob-collapsed-none")).toBeTruthy();
    expect(onExpandedRowChange).toHaveBeenLastCalledWith(null, rows[0]);
  });

  it("supports controlled expandedRowId", async () => {
    const onRowExpand = vi.fn((expandedRow: Row, collapsedRow: Row | null) => (
      <div>{`controlled-${expandedRow.name}-collapsed-${collapsedRow?.name ?? "none"}`}</div>
    ));

    const ControlledHarness = () => {
      const [expandedRowId, setExpandedRowId] = useState<Row["id"] | null>(
        null,
      );

      return (
        <div>
          <p data-testid="expanded-row-id">{String(expandedRowId)}</p>
          <TableWithProviders
            expandedRowId={expandedRowId}
            onExpandedRowChange={(expandedRow) =>
              setExpandedRowId(expandedRow?.id ?? null)
            }
            onRowExpand={onRowExpand}
          />
        </div>
      );
    };

    render(<ControlledHarness />);

    fireEvent.click(screen.getByText("Alice"));
    await waitFor(() =>
      expect(screen.getByTestId("expanded-row-id").textContent).toBe("1"),
    );
    await waitFor(() =>
      expect(screen.getByText("controlled-Alice-collapsed-none")).toBeTruthy(),
    );

    fireEvent.click(screen.getByText("Bob"));
    await waitFor(() =>
      expect(screen.getByTestId("expanded-row-id").textContent).toBe("2"),
    );
    await waitFor(() =>
      expect(screen.getByText("controlled-Bob-collapsed-Alice")).toBeTruthy(),
    );
  });
});
