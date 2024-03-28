const { Then, When } = require("@cucumber/cucumber");
const { EnterNIPayslipPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the Enter NI Payslip question page", async function () {
  const singleAmountQuestionPage = new EnterNIPayslipPage(this.page);

  expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount and continue from the Enter NI Payslip question page",
  async function () {
    const singleAmountQuestionPage = new EnterNIPayslipPage(this.page);
    await singleAmountQuestionPage.answer("1234");
    await singleAmountQuestionPage.continue();
  }
);
