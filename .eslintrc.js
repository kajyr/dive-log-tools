module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', 'prettier', 'sort-keys-fix'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    eqeqeq: ['error', 'smart'],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
};
