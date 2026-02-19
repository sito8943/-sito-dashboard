/* @vitest-environment jsdom */

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  FiltersActions,
  FiltersProvider,
  TableOptionsProvider,
  TranslationProvider,
  useFilters,
  useTableOptions,
} from "providers";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FilterDropdown } from "./FilterDropdown";

const translations: Record<string, string> = {
  "_accessibility:buttons.filters": "Filters",
  "_accessibility:buttons.clear": "Clear",
  "_accessibility:buttons.applyFilters": "Apply filters",
};

const t = (key: string) => translations[key] ?? key;

const AppliedFiltersObserver = () => {
  const { filters } = useTableOptions();

  return <pre data-testid="applied-filters">{JSON.stringify(filters)}</pre>;
};

const CurrentFiltersObserver = () => {
  const { currentFilters } = useFilters();

  return (
    <pre data-testid="current-filters">{JSON.stringify(currentFilters)}</pre>
  );
};

const CurrentFiltersActions = () => {
  const { setCurrentFilters } = useFilters();

  const seedFilters = () => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: {
        status: { value: "active" },
        empty: { value: null },
      },
    });
  };

  const resetFilters = () => {
    setCurrentFilters({ type: FiltersActions.reset });
  };

  return (
    <div>
      <button
        type="button"
        data-testid="seed-current-filters"
        onClick={seedFilters}
      >
        Seed filters
      </button>
      <button
        type="button"
        data-testid="reset-current-filters"
        onClick={resetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

const renderFilterDropdown = (
  handleShow: (show: boolean) => void = vi.fn(),
) => {
  render(
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <FiltersProvider>
          <CurrentFiltersActions />
          <CurrentFiltersObserver />
          <AppliedFiltersObserver />
          <FilterDropdown show={true} handleShow={handleShow} filters={[]} />
        </FiltersProvider>
      </TableOptionsProvider>
    </TranslationProvider>,
  );

  return { handleShow };
};

describe("FilterDropdown", () => {
  afterEach(() => {
    cleanup();
  });

  it("closes when clicking outside", () => {
    const { handleShow } = renderFilterDropdown();

    fireEvent.click(document.body);

    expect(handleShow).toHaveBeenCalledWith(false);
  });

  it("closes when pressing Escape", () => {
    const { handleShow } = renderFilterDropdown();

    fireEvent.keyDown(document, { code: "Escape" });

    expect(handleShow).toHaveBeenCalledWith(false);
  });

  it("applies current filters to table options", async () => {
    const { handleShow } = renderFilterDropdown();

    fireEvent.click(screen.getByTestId("seed-current-filters"));

    await waitFor(() =>
      expect(screen.getByTestId("current-filters").textContent).toContain(
        '"status"',
      ),
    );

    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));

    await waitFor(() =>
      expect(
        JSON.parse(screen.getByTestId("applied-filters").textContent ?? "{}"),
      ).toEqual({
        status: "active",
      }),
    );
    expect(handleShow).toHaveBeenCalledWith(false);
  });

  it("clears current filters and applies empty filters", async () => {
    const { handleShow } = renderFilterDropdown();

    fireEvent.click(screen.getByTestId("seed-current-filters"));

    await waitFor(() =>
      expect(screen.getByTestId("current-filters").textContent).toContain(
        '"status"',
      ),
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));

    await waitFor(() =>
      expect(
        JSON.parse(screen.getByTestId("applied-filters").textContent ?? "{}"),
      ).toEqual({}),
    );
    expect(handleShow).toHaveBeenCalledWith(false);
  });
});
