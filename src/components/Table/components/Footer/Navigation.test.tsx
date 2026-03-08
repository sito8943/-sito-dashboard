/* @vitest-environment jsdom */

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  TableOptionsProvider,
  TranslationProvider,
  useTableOptions,
} from "providers";
import { ReactNode, useEffect } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { Navigation } from "./Navigation";

type WrapperProps = {
  children: ReactNode;
};

const t = (key: string) => {
  const translations: Record<string, string> = {
    "_accessibility:buttons.previous": "Previous",
    "_accessibility:buttons.next": "Next",
  };

  return translations[key] ?? key;
};

const Wrapper = (props: WrapperProps) => {
  const { children } = props;

  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>{children}</TableOptionsProvider>
    </TranslationProvider>
  );
};

type HarnessProps = {
  total: number;
  pageSize: number;
  currentPage: number;
};

const Harness = (props: HarnessProps) => {
  const { total, pageSize, currentPage } = props;
  const {
    setTotal,
    setPageSize,
    setCurrentPage,
    currentPage: activePage,
  } = useTableOptions();

  useEffect(() => {
    setTotal(total);
    setPageSize(pageSize);
    setCurrentPage(currentPage);
  }, [currentPage, pageSize, setCurrentPage, setPageSize, setTotal, total]);

  return (
    <>
      <Navigation />
      <p data-testid="current-page">{activePage}</p>
    </>
  );
};

describe("Navigation", () => {
  afterEach(() => {
    cleanup();
  });

  it("disables next button on exact last page", async () => {
    render(
      <Wrapper>
        <Harness total={40} pageSize={20} currentPage={1} />
      </Wrapper>,
    );

    const nextButton = await screen.findByRole("button", { name: "Next" });
    await waitFor(() => expect(nextButton.hasAttribute("disabled")).toBe(true));
  });

  it("goes to next page when there are still pages left", async () => {
    render(
      <Wrapper>
        <Harness total={45} pageSize={20} currentPage={1} />
      </Wrapper>,
    );

    const nextButton = await screen.findByRole("button", { name: "Next" });
    await waitFor(() =>
      expect(nextButton.hasAttribute("disabled")).toBe(false),
    );

    fireEvent.click(nextButton);
    expect(screen.getByTestId("current-page").textContent).toBe("2");
  });
});
