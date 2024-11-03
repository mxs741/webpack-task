import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      sourceType: "module",
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
      },
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
  },
];