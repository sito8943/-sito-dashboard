import { createContext, useContext } from "react";

// types
import { TFunction, TranslationProviderPropsType } from "./types";

const TranslationContext = createContext(
  {} as { t: TFunction; language: string },
);

/**
 * Renders the TranslationProvider component.
 * @param props - props parameter.
 * @returns Function result.
 */
function TranslationProvider(props: TranslationProviderPropsType) {
  const { children, t, language } = props;

  return (
    <TranslationContext.Provider value={{ t, language }}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Provides the useTranslation hook.
 * @returns Function result.
 */
const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined)
    throw new Error("translationContext must be used within a Provider");
  return context;
};

export { TranslationProvider, useTranslation };
