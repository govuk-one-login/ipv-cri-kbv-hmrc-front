const { Then, When } = require("@cucumber/cucumber");
const { EnterPostgraduateLoanDeductionsP60Page } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-postgraduate-loan-deductions-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterPostgraduateLoanDeductionsP60Page(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter amount and continue from the enter-postgraduate-loan-deductions-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterPostgraduateLoanDeductionsP60Page(
      this.page
    );
    await singleAmountQuestionPage.answer();
    await singleAmountQuestionPage.continue();
  }
);
