const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./setup/testSetup.mjs'],
    hookTimeout: 60000,
  },
});
