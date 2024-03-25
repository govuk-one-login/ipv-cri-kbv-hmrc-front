const { Then, When } = require("@cucumber/cucumber");
const { Enter4DigitsBankAccountTaxCredits } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter amount and continue from the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );
    await singleAmountQuestionPage.answer();
    await singleAmountQuestionPage.continue();
  }
);
