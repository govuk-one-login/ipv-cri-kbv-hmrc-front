module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = "/kbv/question/enter-recent-self-assessment-payment";
  }

  async continue() {
    await this.page.click("#continue");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async answer() {
    await this.page.waitForSelector('input[id="selfAssessmentPaymentAmount"]');
    const day = await this.page.$('input[id="selfAssessmentPaymentDate-day"]');
    const month = await this.page.$(
      'input[id="selfAssessmentPaymentDate-month"]'
    );
    const year = await this.page.$(
      'input[id="selfAssessmentPaymentDate-year"]'
    );
    const amount = await this.page.$('input[id="selfAssessmentPaymentAmount"]');

    await day.fill("30");
    await month.fill("11");
    await year.fill("2023");
    await amount.fill("3625.75");
  }
};
