import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RangeChip } from "./RangeChip";

describe("RangeChip", () => {
  it("renders zero values instead of infinity", () => {
    render(
      <RangeChip<number>
        id="amount"
        text="Amount"
        start={0}
        end={10}
        onClearFilter={vi.fn()}
      />,
    );

    expect(screen.getByText("Amount: 0 - 10")).toBeInTheDocument();
  });
});
