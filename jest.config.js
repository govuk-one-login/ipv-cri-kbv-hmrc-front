/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const wipCoveragePathIgnorePatterns = [
  "src/app.js",
  "src/assets/.*",
  "src/app/.*/index.js",
];

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts}", "!**/tests/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: [
    "node_modules",
    ".*.test.js",
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
  setupFilesAfterEnv: ["./tests/unit/lib/helpers"],
  testMatch: ["**/tests/unit/**/*.test.js"],
  testEnvironment: "node",
};
