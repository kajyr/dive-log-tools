const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');
const sortKeysFix = require('eslint-plugin-sort-keys-fix');
const globals = require('globals');

module.exports = [
  // Apply to all files
  {
    ignores: ['**/node_modules/**', '**/build/**', '**/dist/**', '**/artifacts/**'],
  },
  // Base config for all JS/TS files
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      prettier: prettier,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'eqeqeq': ['error', 'smart'],
      'no-undef': 'off', // TypeScript handles this
      'sort-keys-fix/sort-keys-fix': 'warn',
    },
  },
];
