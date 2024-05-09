module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page, path) {
    this.page = page;
    this.path = `/kbv/question/${path}`;
  }

  async continue() {
    await this.page.click("#continue");
  }

  async answer(answer = "2023") {
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
