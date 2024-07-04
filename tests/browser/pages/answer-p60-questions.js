const { BASE_KBV_QUESTION_PATH } = require("../../../constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, path) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${path}`;
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
