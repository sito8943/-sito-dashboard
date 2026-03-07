/* @vitest-environment jsdom */

import { cleanup, render } from "@testing-library/react";
import { BaseDto } from "lib";
import { TableOptionsProvider, TranslationProvider } from "providers";
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
      <TableOptionsProvider>{children}</TableOptionsProvider>
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
});
