const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    //   on('before:browser:launch', (browser = {}, launchOptions) => {
    //     prepareAudit(launchOptions)
    //   })
    // }
  },
  env: {
    hideXhr: false
  },
  chromeWebSecurity: false,
  experimentalStudio: true,
  retries: {
    runMode: 2,
    openMode: 0
  }
});
