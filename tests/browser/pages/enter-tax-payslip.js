const {
  BASE_KBV_QUESTION_PATH,
  ENTER_TAX_PAYSLIP,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${ENTER_TAX_PAYSLIP}`;
  }

  async continue() {
    await this.page.click("button:text('continue')");
  }

  async answer() {
    await this.page.fill('input[type="text"]', "1234.56");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async selectAbandon() {
    await this.page.click("#abandon");
  }
};
