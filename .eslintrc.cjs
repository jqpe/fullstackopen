module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'vitest-globals/env': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:unicorn/recommended',
    'plugin:vitest-globals/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // in React world null is actually very useful
    'unicorn/no-null': 0,
    // We could configure this with overloads but ehh
    'unicorn/filename-case': 0,
    'unicorn/prevent-abbreviations': [
      2,
      {
        allowList: { props: true },
      },
    ],
    'unicorn/prefer-query-selector': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': [
      2,
      {
        skipUndeclared: true,
      },
    ],
  },
}
