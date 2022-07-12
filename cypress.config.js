const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "uicbrn",
    viewportWidth: 1280,
    viewportHeight: 700,
    "reporter": "mochawesome",
    "reporterOptions": {
        "charts": true,
        "overwrite": true,
        "html": false,
        "json": true,
        "reportDir": "cypress/reports/"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
