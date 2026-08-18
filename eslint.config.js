import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist", "MERN-STACK-T1-P1-*/**"] },
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-empty": "off",
    },
  },
];
