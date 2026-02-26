const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');


module.exports = [
  // Global ignores (reemplaza .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'dist/**',
      'coverage/**',
    ],
  },

  // Base rules for JS files
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Cypress rules only for Cypress-related files
  {
    files: ['cypress/**/*.js', 'cypress/**/*.cy.js', 'cypress.config.*'],
    plugins: {
      cypress,
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },
  prettier,
];