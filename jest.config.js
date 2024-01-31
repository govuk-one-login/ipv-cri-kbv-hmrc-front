module.exports = {
  clearMocks: true,
  modulePaths: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  testMatch: ["<rootDir>/tests/unit/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/lib/helpers"],
  coveragePathIgnorePatterns: [
    "src/assets/.*",
    "src/app/.*/fields.js",
    "src/app/.*/steps.js",
    "src/app/.*/index.js",
    "src/lib/config.js",
    "src/app.js",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
