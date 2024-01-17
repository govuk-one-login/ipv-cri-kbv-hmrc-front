module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    es2020: true,
    jest: true,
  },
  globals: {
    sinon: true,
    expect: true,
    setupDefaultMocks: "readonly",
  },
  extends: ["prettier", "eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: [
    "wallaby.conf.js",
    "node_modules",
    "coverage",
    ".aws-sam",
    "dist",
  ],
  rules: {
    "no-console": 2,
    "padding-line-between-statements": [
      "error",
      { blankLine: "any", prev: "*", next: "*" },
    ],
  },
  overrides: [
    {
      files: "tests/unit/**/*",
      plugins: ["jest"],
      extends: ["plugin:jest/style", "plugin:jest/recommended"],
      globals: {
        req: true,
        res: true,
        next: true,
      },
    },
    {
      files: "tests/**/*",
      rules: {
        "no-unused-vars": [
          "error",
          { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
      },
    },
  ],
};
