/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BaseDto } from "lib";
import { TableOptionsProvider, TranslationProvider } from "providers";
import { afterEach, describe, expect, it } from "vitest";

import { ColumnType } from "./components";
import { Table } from "./Table";

type Row = BaseDto & {
  name: string;
  age: number;
  email: string;
};

const rows: Row[] = [
  { id: 1, name: "Alice", age: 28, email: "alice@test.com" },
  { id: 2, name: "Bob", age: 34, email: "bob@test.com" },
];

const columns: ColumnType<Row>[] = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
];

const translations: Record<string, string> = {
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all rows",
  "_accessibility:labels.actions": "Actions",
  "_accessibility:components.table.jumpToPage": "Jump to page",
  "_accessibility:buttons.columns": "Columns",
  "_accessibility:buttons.reset": "Reset",
  "_accessibility:components.table.empty": "No data available",
};

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === "_accessibility:components.table.selectedCount") {
    const count = typeof options?.count === "number" ? options.count : 0;
    return `Selected ${count}`;
  }

  return translations[key] ?? key;
};

describe("Table column visibility", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the column visibility button when canHideColumns is true", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    expect(screen.getByRole("button", { name: /Columns/ })).toBeInTheDocument();
  });

  it("does not render the column visibility button when canHideColumns is false", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row> entity="users" data={rows} columns={columns} />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    expect(
      screen.queryByRole("button", { name: /Columns/ }),
    ).not.toBeInTheDocument();
  });

  it("opens the dropdown and shows column labels when clicking the button", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveTextContent("Name");
    expect(menu).toHaveTextContent("Age");
    expect(menu).toHaveTextContent("Email");
  });

  it("hides a column when toggling it off in the menu", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    // All columns visible initially
    expect(screen.getByText("alice@test.com")).toBeInTheDocument();

    // Open dropdown and toggle Email off
    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));
    const emailCheckbox = screen.getByRole("checkbox", { name: "Email" });
    fireEvent.click(emailCheckbox);

    // Email column should be hidden
    expect(screen.queryByText("alice@test.com")).not.toBeInTheDocument();
  });

  it("shows a column again when toggling it back on", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    // Open and toggle Email off
    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(screen.queryByText("alice@test.com")).not.toBeInTheDocument();

    // Toggle Email back on
    fireEvent.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(screen.getByText("alice@test.com")).toBeInTheDocument();
  });

  it("does not show columns with hideable false in the menu", () => {
    const columnsWithNonHideable: ColumnType<Row>[] = [
      { key: "name", label: "Name", hideable: false },
      { key: "age", label: "Age" },
      { key: "email", label: "Email" },
    ];

    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columnsWithNonHideable}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));

    const menu = screen.getByRole("menu");
    expect(menu).not.toHaveTextContent("Name");
    expect(menu).toHaveTextContent("Age");
    expect(menu).toHaveTextContent("Email");
  });

  it("respects defaultHiddenColumns on initial render", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider defaultHiddenColumns={["email"]}>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    expect(screen.queryByText("alice@test.com")).not.toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});

describe("Table reset button", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the reset button when canReset is true", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row> entity="users" data={rows} columns={columns} canReset />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    expect(screen.getByRole("button", { name: /Reset/ })).toBeInTheDocument();
  });

  it("does not render the reset button when canReset is false", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider>
          <Table<Row> entity="users" data={rows} columns={columns} />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    expect(
      screen.queryByRole("button", { name: /Reset/ }),
    ).not.toBeInTheDocument();
  });

  it("restores hidden columns to default when reset is clicked", () => {
    render(
      <TranslationProvider t={t} language="en">
        <TableOptionsProvider defaultHiddenColumns={["email"]}>
          <Table<Row>
            entity="users"
            data={rows}
            columns={columns}
            canHideColumns
            canReset
          />
        </TableOptionsProvider>
      </TranslationProvider>,
    );

    // Email hidden by default
    expect(screen.queryByText("alice@test.com")).not.toBeInTheDocument();

    // Show email by toggling
    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Email" }));
    expect(screen.getByText("alice@test.com")).toBeInTheDocument();

    // Reset should hide email again
    fireEvent.click(screen.getByRole("button", { name: /Reset/ }));
    expect(screen.queryByText("alice@test.com")).not.toBeInTheDocument();
  });
});
