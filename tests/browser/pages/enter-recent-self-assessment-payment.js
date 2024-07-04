const {
  BASE_KBV_QUESTION_PATH,
  ENTER_RECENT_SELF_ASSESSMENT_PAYMENT,
} = require("../../../src/constants/routes");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.path = `${BASE_KBV_QUESTION_PATH}${ENTER_RECENT_SELF_ASSESSMENT_PAYMENT}`;
  }

  async continue() {
    await this.page.click("button:text('continue')");
  }

  isCurrentPage() {
    const { pathname } = new URL(this.page.url());
    return pathname === this.path;
  }

  async answer(answer) {
    await this.page.waitForSelector('input[id="selfAssessmentPaymentAmount"]');
    const day = await this.page.$('input[id="selfAssessmentPaymentDate-day"]');
    const month = await this.page.$(
      'input[id="selfAssessmentPaymentDate-month"]'
    );
    const year = await this.page.$(
      'input[id="selfAssessmentPaymentDate-year"]'
    );
    const amount = await this.page.$('input[id="selfAssessmentPaymentAmount"]');

    await day.fill(answer.day);
    await month.fill(answer.month);
    await year.fill(answer.year);
    await amount.fill(answer.amount);
  }
};
