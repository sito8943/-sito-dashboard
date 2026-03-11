/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SortOrder } from "lib";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TableOptionsProvider, useTableOptions } from "./TableOptionsProvider";

type HarnessProps = {
  onSortCallback?: (prop: string, sortOrder: SortOrder) => void;
};

const Harness = (props: HarnessProps) => {
  const { onSortCallback } = props;
  const {
    countOfFilters,
    filters,
    onFilterApply,
    onSort,
    sortingBy,
    sortingOrder,
    clearFilters,
  } = useTableOptions();

  return (
    <div>
      <button
        data-testid="sort-name"
        onClick={() => onSort("name", onSortCallback)}
      >
        Sort by name
      </button>
      <button
        data-testid="apply-filters"
        onClick={() =>
          onFilterApply({
            status: { value: "active" },
            zero: { value: 0 },
            emptyString: { value: "" },
            spacesOnly: { value: "   " },
            emptyArray: { value: [] },
            selectedList: { value: ["admin"] },
            emptyRange: { value: { start: "", end: "" } },
            partialRange: { value: { start: "2026-01-01", end: "" } },
            unchecked: { value: false },
            empty: { value: null },
            undef: { value: undefined },
          })
        }
      >
        Apply filters
      </button>
      <button
        data-testid="apply-camel-filters"
        onClick={() =>
          onFilterApply({
            userName: { value: "alice" },
          })
        }
      >
        Apply camel filters
      </button>
      <button data-testid="clear-status" onClick={() => clearFilters("status")}>
        Clear status
      </button>
      <button data-testid="clear-all" onClick={() => clearFilters()}>
        Clear all
      </button>
      <div data-testid="sorting-by">{sortingBy}</div>
      <div data-testid="sorting-order">{sortingOrder}</div>
      <div data-testid="count-of-filters">{countOfFilters}</div>
      <pre data-testid="filters">{JSON.stringify(filters)}</pre>
    </div>
  );
};

const HookConsumer = () => {
  useTableOptions();
  return null;
};

describe("TableOptionsProvider", () => {
  afterEach(() => {
    cleanup();
  });

  it("sorts and toggles sort order when sorting the same column", () => {
    const onSortCallback = vi.fn();

    render(
      <TableOptionsProvider>
        <Harness onSortCallback={onSortCallback} />
      </TableOptionsProvider>,
    );

    const sortButton = screen.getByTestId("sort-name");

    expect(screen.getByTestId("sorting-by").textContent).toBe("id");
    expect(screen.getByTestId("sorting-order").textContent).toBe(
      SortOrder.DESC,
    );

    fireEvent.click(sortButton);
    expect(screen.getByTestId("sorting-by").textContent).toBe("name");
    expect(screen.getByTestId("sorting-order").textContent).toBe(
      SortOrder.DESC,
    );
    expect(onSortCallback).toHaveBeenLastCalledWith("name", SortOrder.DESC);

    fireEvent.click(sortButton);
    expect(screen.getByTestId("sorting-order").textContent).toBe(SortOrder.ASC);
    expect(onSortCallback).toHaveBeenLastCalledWith("name", SortOrder.ASC);

    fireEvent.click(sortButton);
    expect(screen.getByTestId("sorting-order").textContent).toBe(
      SortOrder.DESC,
    );
    expect(onSortCallback).toHaveBeenLastCalledWith("name", SortOrder.DESC);
  });

  it("applies filters dropping empty values and clears them", () => {
    render(
      <TableOptionsProvider>
        <Harness />
      </TableOptionsProvider>,
    );

    fireEvent.click(screen.getByTestId("apply-filters"));

    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({
      status: "active",
      zero: 0,
      selectedList: ["admin"],
      partialRange: { start: "2026-01-01", end: "" },
      unchecked: false,
    });
    expect(screen.getByTestId("count-of-filters").textContent).toBe("5");

    fireEvent.click(screen.getByTestId("clear-status"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({
      zero: 0,
      selectedList: ["admin"],
      partialRange: { start: "2026-01-01", end: "" },
      unchecked: false,
    });
    expect(screen.getByTestId("count-of-filters").textContent).toBe("4");

    fireEvent.click(screen.getByTestId("clear-all"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({});
    expect(screen.getByTestId("count-of-filters").textContent).toBe("0");
  });

  it("clears filters by exact key without lowercasing", () => {
    render(
      <TableOptionsProvider>
        <Harness />
      </TableOptionsProvider>,
    );

    fireEvent.click(screen.getByTestId("apply-camel-filters"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({
      userName: "alice",
    });

    fireEvent.click(screen.getByTestId("clear-status"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({
      userName: "alice",
    });

    fireEvent.click(screen.getByTestId("clear-all"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({});
  });

  it("throws when useTableOptions is used outside its provider", () => {
    expect(() => render(<HookConsumer />)).toThrow(
      "tableOptionsContext must be used within a Provider",
    );
  });
});
