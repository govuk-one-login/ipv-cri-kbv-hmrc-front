const { Then, When } = require("@cucumber/cucumber");
const { EnterTotalForYearAbovePtP60Page } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-earnings-above-pt-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterTotalForYearAbovePtP60Page(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter amount and continue from the enter-earnings-above-pt-p60 question page",
  async function () {
    const singleAmountQuestionPage = new EnterTotalForYearAbovePtP60Page(
      this.page
    );
    await singleAmountQuestionPage.answer();
    await singleAmountQuestionPage.continue();
  }
);
