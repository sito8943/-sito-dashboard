/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { TableOptionsProvider, FiltersProvider, useFilters } from "@/main";
import { afterEach, describe, expect, it } from "vitest";

const HookConsumer = () => {
  const { currentFilters } = useFilters();
  return <p data-testid="filters-value">{JSON.stringify(currentFilters)}</p>;
};

describe("FiltersProvider", () => {
  afterEach(() => {
    cleanup();
  });

  it("throws when useFilters is used outside its provider", () => {
    expect(() => render(<HookConsumer />)).toThrow(
      "filtersContext must be used within a Provider",
    );
  });

  it("provides filters context inside provider", () => {
    render(
      <TableOptionsProvider>
        <FiltersProvider>
          <HookConsumer />
        </FiltersProvider>
      </TableOptionsProvider>,
    );

    expect(screen.getByTestId("filters-value").textContent).toBe("{}");
  });
});
