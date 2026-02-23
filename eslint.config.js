import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    ignores: [
      "node_modules/**",
      ".DS_Store",
      "dist/**",
      "dist-ssr/**",
      "*.local",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      jsdoc,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...jsdoc.configs["flat/recommended"].rules,
      ...prettierConfig.rules,
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "warn",
      "prefer-const": "warn",
      "jsdoc/require-param-type": 0,
      "jsdoc/require-returns-type": 0,
      "jsdoc/require-jsdoc": [
        1,
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            MethodDefinition: true,
          },
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
    settings: {
      jsdoc: {
        ignoreInternal: true,
        ignorePrivate: true,
      },
    },
  },
];
