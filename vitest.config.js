import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    hookTimeout: 60000,
    setupFiles: ['./setup/testSetup.js'],
    include: ['tests/**/*.test.js'],
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
});
