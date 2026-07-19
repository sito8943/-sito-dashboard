/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { BaseDto, SortOrder } from "lib";
import { TableOptionsProvider, TranslationProvider } from "providers";
import { afterEach, describe, expect, it } from "vitest";

import { ColumnType } from "./components";
import { Table } from "./Table";

type Row = BaseDto & {
  name: string;
  age: number;
};

const rows: Row[] = [{ id: 1, name: "Alice", age: 28 }];
const columns: ColumnType<Row>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "age", label: "Age", sortable: true },
];

const getHeaderButton = (label: string) => {
  const button = screen.getByText(label).closest("button");
  if (!button) throw new Error(`Missing header button: ${label}`);
  return button;
};

const getSortState = (button: HTMLButtonElement) => {
  const state = button.querySelector<HTMLElement>("[data-sort-order]");
  if (!state) throw new Error("Missing reserved sort indicator");
  return state;
};

const renderTable = (showSortPreviewOnHover?: boolean) =>
  render(
    <TranslationProvider t={(key) => key} language="en">
      <TableOptionsProvider
        initialState={{
          sortingBy: "name",
          sortingOrder: SortOrder.DESC,
        }}
      >
        <Table<Row>
          entity="users"
          data={rows}
          columns={columns}
          showSortPreviewOnHover={showSortPreviewOnHover}
        />
      </TableOptionsProvider>
    </TranslationProvider>,
  );

describe("Table sortable header preview", () => {
  afterEach(() => {
    cleanup();
  });

  it("reserves the indicator and enables preview only for inactive columns", () => {
    renderTable(true);

    const nameHeader = getHeaderButton("Name");
    const ageHeader = getHeaderButton("Age");
    const nameSortState = getSortState(nameHeader);
    const ageSortState = getSortState(ageHeader);

    expect(nameSortState).toHaveAttribute("data-sort-order", SortOrder.DESC);
    expect(nameSortState).toHaveClass("table-headers-sort-current");
    expect(nameHeader).not.toHaveClass("table-headers-sort-preview-trigger");
    expect(ageSortState).toHaveAttribute("data-sort-order", SortOrder.DESC);
    expect(ageSortState).toHaveClass("table-headers-sort-preview");
    expect(ageHeader).toHaveClass("table-headers-sort-preview-trigger");
  });

  it("keeps hover previews disabled by default", () => {
    renderTable();

    const ageHeader = getHeaderButton("Age");
    const ageSortState = getSortState(ageHeader);

    expect(ageSortState).toHaveAttribute("data-sort-order", SortOrder.DESC);
    expect(ageSortState).toHaveClass("table-headers-sort-placeholder");
    expect(ageHeader).not.toHaveClass("table-headers-sort-preview-trigger");
  });
});
