import { createContext, useContext } from "react";

// types
import { TFunction, TranslationProviderPropsType } from "./types";

const TranslationContext = createContext({} as { t: TFunction });

function TranslationProvider(props: TranslationProviderPropsType) {
  const { children, t } = props;

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
}

const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined)
    throw new Error("translationContext must be used within a Provider");
  return context;
};

export { useTranslation, TranslationProvider };
