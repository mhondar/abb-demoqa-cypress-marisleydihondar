const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  allowCypressEnv: false,

  env: {
    apiBaseUrl: process.env.CYPRESS_API_BASE_URL || 'https://demoqa.com',
    username: process.env.CYPRESS_USERNAME,
    password: process.env.CYPRESS_PASSWORD,
    userId: process.env.CYPRESS_USER_ID,
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },

  retries: {
    runMode: 2,
    openMode: 0,
  },

  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 8000,
});
