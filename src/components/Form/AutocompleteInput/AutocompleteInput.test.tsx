/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { Option } from "components";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

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

  it("offers creation when the typed value has no exact option match", () => {
    const onCreate = vi.fn();

    render(
      <AutocompleteInput
        id="autocomplete-create"
        label="Autocomplete create"
        value={null}
        onChange={() => undefined}
        options={options}
        createOption={{
          onCreate,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "  Dragon fruit  " } });

    fireEvent.click(screen.getByText('Create "Dragon fruit"'));

    expect(onCreate).toHaveBeenCalledOnce();
    expect(onCreate).toHaveBeenCalledWith("Dragon fruit");
  });

  it("does not offer creation when an exact option already exists", () => {
    render(
      <AutocompleteInput
        id="autocomplete-create-existing"
        label="Autocomplete create existing"
        value={null}
        onChange={() => undefined}
        options={options}
        createOption={{
          onCreate: () => undefined,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create existing");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: " apple " } });

    expect(screen.queryByText('Create "apple"')).not.toBeInTheDocument();
  });

  it("creates the typed option with Enter when no suggestion matches", () => {
    const onCreate = vi.fn();

    render(
      <AutocompleteInput
        id="autocomplete-create-keyboard"
        label="Autocomplete create keyboard"
        value={null}
        onChange={() => undefined}
        options={options}
        createOption={{
          onCreate,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create keyboard");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Dragon fruit" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onCreate).toHaveBeenCalledWith("Dragon fruit");
  });

  it("does not offer creation for a selected value missing from options", () => {
    render(
      <AutocompleteInput
        id="autocomplete-create-selected"
        label="Autocomplete create selected"
        value={{ id: 4, name: "Dragon fruit" }}
        onChange={() => undefined}
        options={options}
        createOption={{
          onCreate: () => undefined,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create selected");
    fireEvent.focus(input);

    expect(screen.queryByText('Create "Dragon fruit"')).not.toBeInTheDocument();
  });

  it("lets Escape propagate when there is nothing to close", () => {
    const onParentKeyDown = vi.fn();
    render(
      <div onKeyDown={onParentKeyDown}>
        <AutocompleteInput
          id="autocomplete"
          label="Autocomplete"
          value={null}
          onChange={() => {}}
          options={[]}
        />
      </div>,
    );

    fireEvent.keyDown(screen.getByLabelText("Autocomplete"), {
      key: "Escape",
    });

    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
  });
  it("matches suggestions ignoring accents and case", () => {
    render(
      <AutocompleteInput
        id="autocomplete-accents"
        label="Autocomplete accents"
        value={null}
        onChange={() => undefined}
        options={[
          { id: 1, name: "ARRÒS AMB VERDURES" },
          { id: 2, name: "Café" },
        ]}
      />,
    );

    const input = screen.getByLabelText("Autocomplete accents");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "arros" } });

    expect(screen.getByText("ARRÒS AMB VERDURES")).toBeInTheDocument();
    expect(screen.queryByText("Café")).not.toBeInTheDocument();
  });

  it("does not offer creation when an option matches ignoring accents", () => {
    render(
      <AutocompleteInput
        id="autocomplete-create-accents"
        label="Autocomplete create accents"
        value={null}
        onChange={() => undefined}
        options={[{ id: 1, name: "Café" }]}
        createOption={{
          onCreate: () => undefined,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create accents");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "cafe" } });

    expect(screen.queryByText('Create "cafe"')).not.toBeInTheDocument();
  });

  it("auto-selects on blur when the input matches ignoring accents", () => {
    const onChange = vi.fn();

    render(
      <AutocompleteInput
        id="autocomplete-blur-accents"
        label="Autocomplete blur accents"
        value={null}
        onChange={onChange}
        options={[{ id: 1, name: "Café" }]}
      />,
    );

    const input = screen.getByLabelText("Autocomplete blur accents");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "cafe" } });
    fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledWith({ id: 1, name: "Café" });
  });

  it("hides the create option when isExisting returns true", () => {
    const isExisting = vi.fn((inputValue: string) => inputValue === "rice");

    render(
      <AutocompleteInput
        id="autocomplete-create-is-existing"
        label="Autocomplete create is existing"
        value={null}
        onChange={() => undefined}
        options={[{ id: 1, name: "rice (Arròs)" }]}
        createOption={{
          onCreate: () => undefined,
          renderLabel: (inputValue) => `Create "${inputValue}"`,
          isExisting,
        }}
      />,
    );

    const input = screen.getByLabelText("Autocomplete create is existing");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: " rice " } });

    expect(isExisting).toHaveBeenCalledWith("rice");
    expect(screen.queryByText('Create "rice"')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "pasta" } });

    expect(screen.getByText('Create "pasta"')).toBeInTheDocument();
  });
});
