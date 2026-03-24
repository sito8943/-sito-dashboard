/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { SelectInput } from "./SelectInput";

const options = [
  { id: 1, value: "Option 1" },
  { id: 2, value: "Option 2" },
  { id: 3, value: "Option 3" },
];

describe("SelectInput", () => {
  it("renders native select by default", () => {
    render(
      <SelectInput
        id="native-select"
        label="Native select"
        value={1}
        onChange={() => undefined}
        options={options}
      />,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 1" }),
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation with non-native options", () => {
    const Example = () => {
      const [value, setValue] = useState<string | number>(1);
      return (
        <>
          <SelectInput
            id="custom-select"
            label="Custom select"
            native={false}
            value={value}
            options={options}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <p data-testid="value">{String(value)}</p>
        </>
      );
    };

    render(<Example />);

    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByTestId("value")).toHaveTextContent("2");
  });
});
