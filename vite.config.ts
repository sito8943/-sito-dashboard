import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

const srcPath = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      components: resolve(srcPath, "components"),
      providers: resolve(srcPath, "providers"),
      lib: resolve(srcPath, "lib"),
      hooks: resolve(srcPath, "hooks"),
    },
    dedupe: ["react"],
  },
  plugins: [react(), dts({ insertTypesEntry: true }), libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "@sito/dashboard",
      fileName: "dashboard",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
