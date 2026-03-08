/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { TranslationProvider, useTranslation } from "./TranslationProvider";

const HookConsumer = () => {
  const { t, language } = useTranslation();
  return <p data-testid="translation-value">{`${t("hello")} - ${language}`}</p>;
};

describe("TranslationProvider", () => {
  afterEach(() => {
    cleanup();
  });

  it("throws when useTranslation is used outside its provider", () => {
    expect(() => render(<HookConsumer />)).toThrow(
      "translationContext must be used within a Provider",
    );
  });

  it("provides translator and language inside provider", () => {
    render(
      <TranslationProvider t={(key) => `t:${key}`} language="es">
        <HookConsumer />
      </TranslationProvider>,
    );

    expect(screen.getByTestId("translation-value").textContent).toBe(
      "t:hello - es",
    );
  });
});
