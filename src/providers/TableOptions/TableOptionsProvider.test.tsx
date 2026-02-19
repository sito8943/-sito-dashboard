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
            empty: { value: null },
            undef: { value: undefined },
          })
        }
      >
        Apply filters
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

  it("applies filters dropping null/undefined and clears them", () => {
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
    });
    expect(screen.getByTestId("count-of-filters").textContent).toBe("2");

    fireEvent.click(screen.getByTestId("clear-status"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({
      zero: 0,
    });
    expect(screen.getByTestId("count-of-filters").textContent).toBe("1");

    fireEvent.click(screen.getByTestId("clear-all"));
    expect(
      JSON.parse(screen.getByTestId("filters").textContent ?? "{}"),
    ).toEqual({});
    expect(screen.getByTestId("count-of-filters").textContent).toBe("0");
  });
});
