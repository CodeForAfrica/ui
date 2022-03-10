module.exports = {
  verbose: true,
  // Stop running tests after `n` failures
  bail: 1,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Default timeout of a test in milliseconds.
  testTimeout: 30000,
  projects: [
      "./apps/docs/jest.docs.config.js"
  ],
}
