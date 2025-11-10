import type { Preview } from "@storybook/react";
import type { Decorator } from "@storybook/react";

// Global styles (Tailwind + project tokens)
import "./styles.css";
import "../src/index.css";
import "../src/styles/base-colors.css";

// Providers
import { TranslationProvider, TableOptionsProvider } from "providers";

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
          "Components",
          [
            "Form",
            [
              "TextInput",
              "FileInput",
              "SelectInput",
              "CheckInput",
              "AutocompleteInput",
            ],
            "Chip",
            "Badge",
            "Tooltip",
            "Loading",
            "Table",
          ],
        ],
      },
    },
  },
};

export default preview;
