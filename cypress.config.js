const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      // https://github.com/bahmutov/cypress-slow-down
      commandDelay: 300,
    },
    specPattern: '**/*.js',
    chromeWebSecurity:false,
    trashAssetsBeforeRuns:false,
    defaultCommandTimeout: 2500

  },
});
