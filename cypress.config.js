const { defineConfig } = require('cypress');
require('dotenv').config();

function loadEnvironmentConfig(environment) {
  try {
    return require(`./cypress/config/${environment}.config.js`);
  } catch {
    console.warn(`No config found for environment: ${environment}`);
    return {};
  }
}

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      const environment = config.env.environment || 'qa';

      const envConfig = loadEnvironmentConfig(environment);

      config.baseUrl = envConfig.baseUrl || config.baseUrl;

      config.env = {
        ...config.env,
        ...envConfig,
      };

      return config;
    },

    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },

  env: {
    username: process.env.CYPRESS_USERNAME,
    password: process.env.CYPRESS_PASSWORD,
  },

  retries: {
    runMode: 2,
    openMode: 0,
  },
});
