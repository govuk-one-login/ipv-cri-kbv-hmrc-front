module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/kbv/answer-security-questions";
  }

  async start() {
    await this.page.click("#start");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());

    return pathname === this.path;
  }
};
