import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve?.alias || {}),
      components: resolve(__dirname, "../src/components"),
      providers: resolve(__dirname, "../src/providers"),
      lib: resolve(__dirname, "../src/lib"),
      hooks: resolve(__dirname, "../src/hooks"),
    };

    // Remove library-only plugins that break Storybook's Vite build
    if (Array.isArray(config.plugins)) {
      config.plugins = config.plugins.filter((p: any) => {
        const name = (p && (p.name || p?.api?.name)) || "";
        return !(
          typeof name === "string" &&
          (name.includes("dts") || name.includes("lib-inject-css"))
        );
      });
    }
    return config;
  },
};

export default config;
