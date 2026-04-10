import { createContext, useContext } from "react";

// types
import { TranslationContextType, TranslationProviderPropsType } from "./types";

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
  const value: TranslationContextType = { t, language };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Provides the useTranslation hook.
 * @returns Translation context value with `t` and `language`.
 */
const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context)
    throw new Error("translationContext must be used within a Provider");
  return context;
};

export { TranslationProvider, useTranslation };
