/* @vitest-environment jsdom */

import { render, screen, waitFor } from "@testing-library/react";
import { FilterTypes } from "lib";
import { TableOptionsProvider, useTableOptions } from "providers";
import { useEffect } from "react";
import { describe, expect, it } from "vitest";

import { ActiveFilters } from "./ActiveFilters";

const Harness = () => {
  const { onFilterApply } = useTableOptions();

  useEffect(() => {
    onFilterApply({
      amount: { value: { start: 0, end: 0 } },
    });
  }, [onFilterApply]);

  return (
    <ActiveFilters
      filtersDefinition={[
        {
          type: FilterTypes.number,
          propertyName: "amount",
          label: "Amount",
        },
      ]}
    />
  );
};

describe("ActiveFilters", () => {
  it("renders range filters with falsy values such as 0", async () => {
    render(
      <TableOptionsProvider>
        <Harness />
      </TableOptionsProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Amount: 0 - 0")).toBeInTheDocument();
    });
  });
});
