/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { Option } from "components";
import { FilterTypes } from "lib";
import {
  FiltersActions,
  FiltersProvider,
  TableOptionsProvider,
  useFilters,
} from "providers";
import { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { AutocompleteWidget } from "./AutocompleteWidget";
import { SelectWidget } from "./SelectWidget";

type SeedFiltersButtonProps = {
  toUpdate: Record<string, { value: unknown }>;
};

function SeedFiltersButton(props: SeedFiltersButtonProps) {
  const { toUpdate } = props;
  const { setCurrentFilters } = useFilters();

  return (
    <button
      type="button"
      onClick={() =>
        setCurrentFilters({
          type: FiltersActions.update,
          toUpdate,
        })
      }
    >
      Seed filters
    </button>
  );
}

function renderWithProviders(children: ReactNode) {
  render(
    <TableOptionsProvider>
      <FiltersProvider>{children}</FiltersProvider>
    </TableOptionsProvider>,
  );
}

describe("Widgets filters value mapping", () => {
  it("normalizes select object values to option id", () => {
    const options: Option[] = [
      { id: "active", value: "Active" },
      { id: "inactive", value: "Inactive" },
    ];

    renderWithProviders(
      <>
        <SeedFiltersButton
          toUpdate={{
            status: { value: { id: "inactive", value: "Inactive" } },
          }}
        />
        <SelectWidget
          type={FilterTypes.select}
          propertyName="status"
          label="Status"
          options={options}
        />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Seed filters" }));

    expect(screen.getByRole("combobox")).toHaveValue("inactive");
  });

  it("passes an option object to autocomplete when filter is preloaded", () => {
    const options: Option[] = [
      { id: "admin", value: "Admin" },
      { id: "viewer", value: "Viewer" },
    ];

    renderWithProviders(
      <>
        <SeedFiltersButton
          toUpdate={{
            role: { value: { id: "admin", value: "Admin" } },
          }}
        />
        <AutocompleteWidget
          type={FilterTypes.autocomplete}
          propertyName="role"
          label="Role"
          options={options}
          multiple={false}
        />
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Seed filters" }));

    expect(screen.getByRole("textbox")).toHaveValue("Admin");
  });
});
