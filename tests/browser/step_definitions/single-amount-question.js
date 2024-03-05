const { Then, When } = require("@cucumber/cucumber");
const { SingleAmountQuestionPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the single-amount-question page", async function () {
  const singleAmountQuestionPage = new SingleAmountQuestionPage(this.page);

  expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount and continue from single-amount-question page",
  async function () {
    const singleAmountQuestionPage = new SingleAmountQuestionPage(this.page);
    await singleAmountQuestionPage.answer();
    await singleAmountQuestionPage.continue();
  }
);
