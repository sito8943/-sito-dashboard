/**Define a translation function */
export type TranslationOptions = Record<string, unknown>;
export type TFunction = (text: string, options?: TranslationOptions) => string;

export type TranslationProviderPropsType = {
  t: TFunction;
  language: string;
  children: React.ReactNode;
};
