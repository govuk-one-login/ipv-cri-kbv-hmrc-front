module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/kbv/question/enter-pensions-benefits-self-assessment";
  }

  async continue() {
    await this.page.click("#continue");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async answer() {
    await this.page.waitForSelector('input[type="text"]');
    const inputs = await this.page.$$('input[type="text"]');
    for (let input of inputs) {
      await input.fill("200");
    }
  }
};
