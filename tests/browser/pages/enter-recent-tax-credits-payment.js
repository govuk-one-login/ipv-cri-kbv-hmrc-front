const {
  BASE_KBV_QUESTION_PATH,
  ENTER_RECENT_TAX_CREDITS_PAYMENT,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${ENTER_RECENT_TAX_CREDITS_PAYMENT}`;
  }

  async continue() {
    await this.page.click("button:text('continue')");
  }

  async answer(answer) {
    await this.page.fill('input[type="text"]', answer);
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  hasErrorSummary() {
    return this.page.locator(".govuk-error-summary");
  }
};
