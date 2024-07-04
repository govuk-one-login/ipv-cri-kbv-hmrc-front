const {
  BASE_KBV_PATH,
  ANSWER_SECURITY_QUESTIONS,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_PATH}${ANSWER_SECURITY_QUESTIONS}`;
  }

  async start() {
    await this.page.click("#start");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());

    return pathname === this.path;
  }

  async selectAbandon() {
    await this.page.click("#abandon");
  }
};
