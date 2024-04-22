const { Then, When } = require("@cucumber/cucumber");
const { EnterStatutorySharedParentalPayP60 } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-statutory-shared-parental-pay-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterStatutorySharedParentalPayP60(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter amount and continue from the enter-statutory-shared-parental-pay-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterStatutorySharedParentalPayP60(
      this.page
    );
    await singleAmountQuestionPage.answer();
    await singleAmountQuestionPage.continue();
  }
);
