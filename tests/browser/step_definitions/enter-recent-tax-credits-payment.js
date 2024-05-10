const { Then, When } = require("@cucumber/cucumber");
const { EnterRecentTaxCreditsPayment } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-recent-tax-credits-payment question page",
  async function () {
    const singleAmountQuestionPage = new EnterRecentTaxCreditsPayment(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter correct account number and continue from the enter-recent-tax-credits-payment question page",
  async function () {
    const singleAmountQuestionPage = new EnterRecentTaxCreditsPayment(
      this.page
    );
    await singleAmountQuestionPage.answer("1234.45");
    await singleAmountQuestionPage.continue();
  }
);
