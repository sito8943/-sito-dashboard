import type { Preview } from "@storybook/react";

// Global styles (Tailwind + project tokens)
import "../src/index.css";
import "../src/styles/base-colors.css";

const preview: Preview = {
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
        order: ["Components", ["Form", ["TextInput", "FileInput"]]],
      },
    },
  },
};

export default preview;

