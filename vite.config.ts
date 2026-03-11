import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { defineConfig } from "vitest/config";

const srcPath = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
      providers: resolve(srcPath, "providers"),
      lib: resolve(srcPath, "lib"),
      hooks: resolve(srcPath, "hooks"),
    },
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: [
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.stories.ts",
        "**/*.stories.tsx",
      ],
    }),
    libInjectCss(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/setupTests.ts"],
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(srcPath, "main.ts"),
        // Components
        Badge: resolve(srcPath, "components/Badge/index.ts"),
        Button: resolve(srcPath, "components/Button/index.ts"),
        Chip: resolve(srcPath, "components/Chip/index.ts"),
        Dropdown: resolve(srcPath, "components/Dropdown/index.ts"),
        Form: resolve(srcPath, "components/Form/index.ts"),
        IconButton: resolve(srcPath, "components/IconButton/index.ts"),
        Loading: resolve(srcPath, "components/Loading/index.ts"),
        SvgIcons: resolve(srcPath, "components/SvgIcons/index.ts"),
        Table: resolve(srcPath, "components/Table/index.ts"),
        Tooltip: resolve(srcPath, "components/Tooltip/index.ts"),
        // Providers
        FiltersProvider: resolve(srcPath, "providers/FiltersProvider/index.ts"),
        TableOptions: resolve(srcPath, "providers/TableOptions/index.ts"),
        Translation: resolve(srcPath, "providers/Translation/index.ts"),
        // Lib
        lib: resolve(srcPath, "lib/index.ts"),
      },
      name: "@sito/dashboard",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});
