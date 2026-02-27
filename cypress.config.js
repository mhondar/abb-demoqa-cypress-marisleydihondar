const { defineConfig } = require('cypress');
const fs = require('fs');
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

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    // Screenshots
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/artifacts/screenshots',

    // Videos
    video: false,
    videosFolder: 'cypress/artifacts/videos',
    videoCompression: 32,

    // Limpia assets antes de cada run
    trashAssetsBeforeRuns: true,

    setupNodeEvents(on, config) {
      //  borra videos de specs que pasaron
      on('after:spec', (spec, results) => {
        if (results?.video && results.stats?.failures === 0) {
          fs.unlinkSync(results.video);
        }
      });

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
