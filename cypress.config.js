const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "uicbrn",
    viewportWidth: 1280,
    viewportHeight: 700,
   
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
