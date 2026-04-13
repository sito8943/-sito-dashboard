/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { Option } from "components";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { AutocompleteInput } from "./AutocompleteInput";

const options: Option[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

describe("AutocompleteInput", () => {
  it("selects a suggestion using arrow keys and Enter", () => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <>
          <AutocompleteInput
            id="autocomplete"
            label="Autocomplete"
            value={value}
            onChange={setValue}
            options={options}
          />
          {!Array.isArray(value) && (
            <p data-testid="value">{value?.name ?? ""}</p>
          )}
        </>
      );
    };

    render(<Example />);

    const input = screen.getByLabelText("Autocomplete");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByTestId("value")).toHaveTextContent("Banana");
  });

  it("disables native required once a value is selected in multiple mode", () => {
    const Example = () => {
      const [value, setValue] = useState<Option[] | null>(null);
      return (
        <AutocompleteInput
          id="autocomplete-required-multiple"
          label="Autocomplete"
          multiple
          required
          value={value}
          onChange={(nextValue) =>
            setValue(Array.isArray(nextValue) ? nextValue : null)
          }
          options={options}
        />
      );
    };

    render(<Example />);

    const input = screen.getByRole("textbox", { name: /autocomplete/i });
    expect(input).toBeRequired();

    fireEvent.focus(input);
    fireEvent.click(screen.getByText("Apple"));

    expect(input).not.toBeRequired();
  });
});
