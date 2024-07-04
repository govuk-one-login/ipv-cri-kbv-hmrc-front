const {
  BASE_KBV_QUESTION_PATH,
  ENTER_4_DIGITS_BANK_ACCOUNT_TAX_CREDITS,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${ENTER_4_DIGITS_BANK_ACCOUNT_TAX_CREDITS}`;
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
