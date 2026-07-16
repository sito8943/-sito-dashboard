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
    expect(input).toHaveAttribute("required");

    fireEvent.focus(input);
    fireEvent.click(screen.getByText("Apple"));

    expect(input).not.toHaveAttribute("required");
  });

  it("allows selecting consecutive suggestions in multiple mode", () => {
    const Example = () => {
      const [value, setValue] = useState<Option[] | null>(null);
      return (
        <>
          <AutocompleteInput
            id="autocomplete-multiple"
            label="Autocomplete multiple"
            multiple
            value={value}
            onChange={(nextValue) =>
              setValue(Array.isArray(nextValue) ? nextValue : null)
            }
            options={options}
          />
          <p data-testid="value">
            {value?.map((option) => option.name).join(", ") ?? ""}
          </p>
        </>
      );
    };

    render(<Example />);

    const input = screen.getByLabelText("Autocomplete multiple");
    fireEvent.focus(input);
    fireEvent.click(screen.getByText("Apple"));
    fireEvent.click(screen.getByText("Banana"));

    expect(screen.getByTestId("value")).toHaveTextContent("Apple, Banana");
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("selects the matching option on blur by default", () => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <>
          <AutocompleteInput
            id="autocomplete-blur"
            label="Autocomplete blur"
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

    const input = screen.getByLabelText("Autocomplete blur");
    fireEvent.change(input, { target: { value: "banana" } });
    fireEvent.blur(input);

    expect(screen.getByTestId("value")).toHaveTextContent("Banana");
  });

  it("does not select on blur when autoSelectOnBlur is false", () => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <>
          <AutocompleteInput
            id="autocomplete-blur-disabled"
            label="Autocomplete blur disabled"
            value={value}
            onChange={setValue}
            options={options}
            autoSelectOnBlur={false}
          />
          {!Array.isArray(value) && (
            <p data-testid="value">{value?.name ?? ""}</p>
          )}
        </>
      );
    };

    render(<Example />);

    const input = screen.getByLabelText("Autocomplete blur disabled");
    fireEvent.change(input, { target: { value: "banana" } });
    fireEvent.blur(input);

    expect(screen.getByTestId("value")).toHaveTextContent("");
  });
});
