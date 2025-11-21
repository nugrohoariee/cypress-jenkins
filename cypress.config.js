const { defineConfig } = require("cypress");

const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {});
      //allureWriter(on, config);
      return config;
    },
  },
   env: {
      allure: true,
    },

});
