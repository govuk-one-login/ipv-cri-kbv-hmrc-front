module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/kbv/question/enter-4-digits-bank-account-tax-credits";
  }

  async continue() {
    await this.page.click("#continue");
  }

  async answer() {
    await this.page.fill('input[type="text"]', "23");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }
};
