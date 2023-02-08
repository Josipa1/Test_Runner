const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser, launchOptions) => {
        console.log(launchOptions.args);
        if (browser.name === "chrome") {
          launchOptions.args.push("--incognito");
        }

        if (browser.name === 'edge') {
          // launch chrome using incognito
          args.push(' --incognito')
          console.log(args)
        }
        return launchOptions;
      });
    },
    
    env: {
      // https://github.com/bahmutov/cypress-slow-down
      commandDelay: 2500,
    },
    specPattern: '**/*.js',
    chromeWebSecurity:false,
    trashAssetsBeforeRuns:false,
    defaultCommandTimeout: 6000
    //retries: 2,
    

  },

  
});
