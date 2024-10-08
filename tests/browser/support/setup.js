require("dotenv").config();
require("axios");

const {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");

// FIXME This is large due to cold starts
setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  global.browser =
    process.env.GITHUB_ACTIONS || process.env.CHROMIUM_HEADLESS
      ? await chromium.launch()
      : await chromium.launch({
          // Not headless so we can watch test runs
          headless: false,
          // Slow so we can see things happening
          slowMo: 500,
        });
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function ({ pickle } = {}) {
  // Only if MOCK_API do we use the @mock-api -> client_id mapping
  if (!(process.env.MOCK_API === "true")) {
    return;
  }

  const tags = pickle.tags || [];
  const tag = tags.find((tag) => tag.name.startsWith("@mock-api:"));

  if (!tag) {
    return;
  }

  const header = tag?.name.substring(10);

  this.TESTING_CLIENT_ID = header;
});

// Create a new test context and page per scenario
Before(async function () {
  this.context = await global.browser.newContext({});

  this.page = await this.context.newPage();
});

// Cleanup after each scenario
After(async function () {
  await this.page.close();
  await this.context.close();
});
