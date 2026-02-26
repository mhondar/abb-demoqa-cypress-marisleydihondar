const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');

module.exports = [
  // Replaces .eslintignore (ESLint v9+)
  {
    ignores: [
      'node_modules/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'dist/**',
      'coverage/**',
      '*.log',
    ],
  },

  // Base JS rules
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Cypress-specific rules
  {
    files: ['cypress/**/*.js', 'cypress/**/*.cy.js', 'cypress.config.*'],
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },

  // Disable formatting-related ESLint rules that conflict with Prettier
  prettier,
];
