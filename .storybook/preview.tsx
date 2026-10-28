// Global styles (Tailwind + project tokens)
// dashboard is headless (no colors). Storybook acts as the consumer app and
// provides the color layer locally (mirrors @sito/dashboard-app/theme.css).
import "./styles.css";
import "../src/index.css";
import "./theme.css";

import type { Preview } from "@storybook/react";
import type { Decorator } from "@storybook/react";
// Providers
import { TableOptionsProvider, TranslationProvider } from "@/main";

const translations: Record<string, string> = {
  // Labels
  "_accessibility:labels.actions": "Acciones",

  // Buttons
  "_accessibility:buttons.previous": "Anterior",
  "_accessibility:buttons.next": "Siguiente",
  "_accessibility:buttons.filters": "Filtros",
  "_accessibility:buttons.clear": "Limpiar",
  "_accessibility:buttons.applyFilters": "Aplicar filtros",

  // Table
  "_accessibility:components.table.empty": "Sin datos",
  "_accessibility:components.table.pageSizes": "Por página",
  "_accessibility:components.table.of": "de",
  "_accessibility:components.table.jumpToPage": "Ir a página",
  "_accessibility:components.table.filters.range.start": "Desde",
  "_accessibility:components.table.filters.range.end": "Hasta",
};

const t = (key: string) => translations[key] ?? key;

const withProviders: Decorator = (Story) => (
  <TranslationProvider t={t} language="es">
    <TableOptionsProvider>
      <Story />
    </TableOptionsProvider>
  </TranslationProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Atoms",
          [
            "Button",
            "IconButton",
            "TextInput",
            "FileInput",
            "SelectInput",
            "CheckInput",
            "Chip",
            "Badge",
            "Tooltip",
            "Loading",
          ],
          "Molecules",
          ["AutocompleteInput", "Dropdown", "Actions"],
          "Organisms",
          ["Table"],
        ],
      },
    },
  },
};

export default preview;
