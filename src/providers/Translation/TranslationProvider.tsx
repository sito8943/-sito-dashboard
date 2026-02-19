import { createContext, useContext } from "react";

// types
import { TFunction, TranslationProviderPropsType } from "./types";

const TranslationContext = createContext(
  {} as { t: TFunction; language: string },
);

/**
 *
 * @param props
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
 *
 */
const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined)
    throw new Error("translationContext must be used within a Provider");
  return context;
};

export { TranslationProvider, useTranslation };
