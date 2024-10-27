import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"], languageOptions: {sourceType: "module"}
  },
  {
    languageOptions: { globals: globals.browser }
  },
  {
    ignores: ["webpack.config.dev.js", "webpack.config.prod.js"]
  },
  pluginJs.configs.recommended,
];