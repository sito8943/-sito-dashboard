import { createContext, useContext } from "react";

// types
import { TFunction, TranslationProviderPropsType } from "./types";

type TranslationContextType = { t: TFunction; language: string };

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
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
  if (!context)
    throw new Error("translationContext must be used within a Provider");
  return context;
};

export { TranslationProvider, useTranslation };
