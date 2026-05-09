import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import eslint from "@eslint/js";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import n from "eslint-plugin-n";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";
import jest from "eslint-plugin-jest";

export default defineConfig([
  {
    name: "Global Ignores",
    ignores: ["coverage/**", "dist/**", "node_modules/**", ".vscode/**", ".github/**"],
  },

  {
    files: ["**/*.{js,ts}"],
    plugins: {
      "@eslint-community/eslint-comments": eslintComments,
      "@typescript-eslint": tseslint.plugin,
      "eslint-plugin": eslintPlugin,
      n,
    },
    extends: [eslint.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      ecmaVersion: "latest",
      globals: { ...globals.es2025, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
    rules: {
      "@eslint-community/eslint-comments/no-unused-disable": "error",
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { disallowTypeAnnotations: false, fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "eslint-plugin/require-meta-docs-description": [
        "error",
        { pattern: "^(Enforce|Require|Disallow|Suggest|Prefer)" },
      ],
      "eslint-plugin/test-case-property-ordering": "error",
      curly: "error",
      eqeqeq: ["error", "smart"],
      "n/no-missing-import": "off",
      "n/no-missing-require": "off",
      "n/no-unsupported-features/es-builtins": "error",
      "n/no-unsupported-features/es-syntax": "off",
      "no-else-return": "error",
      "no-negated-condition": "error",
      "no-unused-vars": "off",
      "no-var": "error",
      "object-shorthand": ["error", "always", { avoidExplicitReturnArrows: true }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "always", prev: "directive", next: "*" },
        { blankLine: "any", prev: "directive", next: "directive" },
      ],
      "prefer-const": ["error", { destructuring: "all" }],
      "prefer-destructuring": ["error", { VariableDeclarator: { array: true, object: true } }],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-unicode-regexp": "error",
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
    },
  },

  {
    name: "Tests",
    files: ["**/*.{test,spec}.{js,jsx,cjs,mjs,ts,tsx,cts,mts}", "**/jest.setup.js"],
    extends: [jest.configs["flat/recommended"], jest.configs["flat/style"]],
    languageOptions: {
      globals: { ...globals.jest, ...globals.es2025, ...globals.node },
    },
  },

  eslintConfigPrettier,
]);
