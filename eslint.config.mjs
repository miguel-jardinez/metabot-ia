import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/block-spacing": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/lines-around-comment": ["error", { "beforeBlockComment": true }],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "@stylistic/no-confusing-arrow": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-curly-spacing": ["error", "always"]
    }
  }
];

export default eslintConfig;
