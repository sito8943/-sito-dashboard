import react from "@vitejs/plugin-react";
import { existsSync } from "fs";
import { dirname, relative, resolve } from "path";
import type { Plugin } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { defineConfig } from "vitest/config";

const srcPath = resolve(__dirname, "src");
const distPath = resolve(__dirname, "dist");

// libInjectCss emits `import "./X.css"` in every format; CommonJS needs require().
const cjsCssRequire = (): Plugin => ({
  name: "cjs-css-require",
  enforce: "post",
  renderChunk(code, _chunk, options) {
    if (options.format !== "cjs") return null;
    return code.replace(
      /import\s*(["'])(\.\/[^"']+\.css)\1;?/g,
      (_m, q: string, path: string) => `require(${q}${path}${q});`,
    );
  },
});

// node16/nodenext resolution needs explicit extensions in relative specifiers of
// a "type": "module" package, so resolve each one against the source tree.
const sourceExists = (path: string) =>
  [".ts", ".tsx", ".d.ts"].some((ext) => existsSync(`${path}${ext}`));

const withJsExtension = (filePath: string, specifier: string) => {
  const sourceDir = resolve(srcPath, relative(distPath, dirname(filePath)));
  const target = resolve(sourceDir, specifier);
  if (sourceExists(target)) return `${specifier}.js`;
  if (sourceExists(resolve(target, "index"))) return `${specifier}/index.js`;
  return specifier;
};

const addDtsExtensions = (filePath: string, content: string) =>
  content.replace(
    /(\bfrom\s*|\bimport\s*\(\s*)(["'])(\.{1,2}\/[^"']+?)\2/g,
    (match, prefix: string, q: string, specifier: string) =>
      /\.(c|m)?js$/.test(specifier)
        ? match
        : `${prefix}${q}${withJsExtension(filePath, specifier)}${q}`,
  );

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
      beforeWriteFile: (filePath, content) => ({
        filePath,
        content: addDtsExtensions(filePath, content),
      }),
    }),
    libInjectCss(),
    cjsCssRequire(),
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
