const wipCoveragePathIgnorePatterns = [
  "src/app.js",
  "src/assets/.*",
  "src/app/.*/index.js",
];

module.exports = {
  clearMocks: true,
  modulePaths: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  testMatch: ["<rootDir>/tests/unit/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/lib/helpers"],
  coveragePathIgnorePatterns: [
    "./src/app/.*/steps.js",
    "./src/app/.*/fields.js",
    "./src/lib/config.js",
  ].concat(wipCoveragePathIgnorePatterns),
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
