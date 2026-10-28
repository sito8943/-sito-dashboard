/**
 * Every `Chip` variant. The chip gets `chip-<variant>`; colors are not shipped
 * here (the package is headless) but in the theme layer
 * (`@sito/dashboard-app/theme.css`, mirrored in `.storybook/theme.css`).
 */
export const CHIP_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
  "none",
] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];
