const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  allowCypressEnv: false,

  env: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL || 'https://demoqa.com',
    username: process.env.CYPRESS_USERNAME,
    password: process.env.CYPRESS_PASSWORD,
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // Placeholder for future plugins (reporting, tasks, etc.)
      return config;
    },
  },

  retries: {
    runMode: 2, // Retry in CI
    openMode: 0, // No retry in interactive mode
  },

  video: true,
  screenshotOnRunFailure: true,

  viewportWidth: 1280,
  viewportHeight: 800,

  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
});
