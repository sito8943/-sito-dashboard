import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { mergeAlias } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  viteFinal: (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = mergeAlias(viteConfig.resolve.alias, {
      "@": resolve(__dirname, "../src"),
    });

    // Remove library-only plugins that break Storybook's Vite build
    if (Array.isArray(viteConfig.plugins)) {
      viteConfig.plugins = viteConfig.plugins.filter((p: any) => {
        const name = (p && (p.name || p?.api?.name)) || "";
        return !(
          typeof name === "string" &&
          (name.includes("dts") || name.includes("lib-inject-css"))
        );
      });
    }
    return viteConfig;
  },
};

export default config;
