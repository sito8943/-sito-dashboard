/**Define a translation function */
export type TFunction = (text: string, options?: any) => string;

export type TranslationProviderPropsType = {
  t: TFunction;
  children: React.ReactNode;
};
