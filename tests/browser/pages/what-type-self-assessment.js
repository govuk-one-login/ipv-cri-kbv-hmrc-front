const {
  BASE_KBV_QUESTION_PATH,
  WHAT_TYPE_SELF_ASSESSMENT,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${WHAT_TYPE_SELF_ASSESSMENT}`;
  }

  async continue() {
    await this.page.click("button:text('continue')");
  }

  async selectRadioOption(optionValue) {
    await this.page.click(`input[value="${optionValue}"]`);
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async selectAbandon() {
    await this.page.click("#abandon");
  }
};
