/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { BaseDto, FilterTypes } from "lib";
import {
  FiltersProvider,
  TableOptionsProvider,
  TranslationProvider,
} from "providers";
import { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { ColumnType } from "../types";
import { TableHeader } from "./TableHeader";

type Row = BaseDto & {
  name: string;
};

type WrapperProps = {
  children: ReactNode;
};

const t = (key: string) => key;

const Wrapper = (props: WrapperProps) => {
  const { children } = props;
  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <FiltersProvider>{children}</FiltersProvider>
      </TableOptionsProvider>
    </TranslationProvider>
  );
};

describe("TableHeader", () => {
  afterEach(() => {
    cleanup();
  });

  it("does not mutate input columns order while deriving filters", () => {
    const columns: ColumnType<Row>[] = [
      { key: "name", label: "Name", pos: 0 },
      { key: "id", label: "Id", pos: 1 },
    ];

    render(
      <Wrapper>
        <TableHeader columns={columns} />
      </Wrapper>,
    );

    expect(columns.map((column) => column.key)).toEqual(["name", "id"]);
  });

  it("does not render filter button when there are no filters configured", () => {
    render(
      <Wrapper>
        <TableHeader columns={[{ key: "name", label: "Name" }]} />
      </Wrapper>,
    );

    expect(
      screen.queryByRole("button", { name: "_accessibility:buttons.filters" }),
    ).not.toBeInTheDocument();
  });

  it("renders filter button when at least one column has filter options", () => {
    render(
      <Wrapper>
        <TableHeader
          columns={[
            {
              key: "name",
              label: "Name",
              filterOptions: { type: FilterTypes.text },
            },
          ]}
        />
      </Wrapper>,
    );

    expect(
      screen.getByRole("button", { name: /_accessibility:buttons\.filters/ }),
    ).toBeInTheDocument();
  });
});
