import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { defineConfig } from "vitest/config";

const srcPath = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      "@": srcPath,
    },
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      entryRoot: "src",
      exclude: [
        "tests/**",
        "stories/**",
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
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        index: resolve(srcPath, "main.ts"),
        // Components
        Badge: resolve(srcPath, "components/atoms/Badge/index.ts"),
        Button: resolve(srcPath, "components/atoms/Button/index.ts"),
        Chip: resolve(srcPath, "components/atoms/Chip/index.ts"),
        Dropdown: resolve(srcPath, "components/molecules/Dropdown/index.ts"),
        Form: resolve(srcPath, "entries/Form.ts"),
        IconButton: resolve(srcPath, "components/atoms/IconButton/index.ts"),
        Loading: resolve(srcPath, "components/atoms/Loading/index.ts"),
        SvgIcons: resolve(srcPath, "components/atoms/SvgIcons/index.ts"),
        Table: resolve(srcPath, "components/organisms/Table/index.ts"),
        Tooltip: resolve(srcPath, "components/atoms/Tooltip/index.ts"),
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
      // Subpaths included (e.g. "@sito/ui/styles.css"), so peers are never inlined.
      external: (id) =>
        ["@sito/ui", "react", "react-dom"].some(
          (name) => id === name || id.startsWith(`${name}/`),
        ),
    },
  },
});
