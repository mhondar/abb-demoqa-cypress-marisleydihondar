module.exports = {
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended', 'prettier'],
  plugins: ['cypress'],
  overrides: [
    {
      files: ['cypress/**/*.js', 'cypress.config.*'],
      env: { 'cypress/globals': true },
    },
  ],
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
