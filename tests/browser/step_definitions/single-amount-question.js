const { Then, When } = require("@cucumber/cucumber");
const { EnterNIPayslipPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the Payslip question page", async function () {
  const enterNIPayslipPage = new EnterNIPayslipPage(this.page);

  expect(enterNIPayslipPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount and continue from Payslip question page",
  async function () {
    const enterNIPayslipPage = new EnterNIPayslipPage(this.page);
    await enterNIPayslipPage.answer();
    await enterNIPayslipPage.continue();
  }
);

When(
  "they click on the abandon link from Payslip question page",
  async function () {
    const enterNIPayslipPage = new EnterNIPayslipPage(this.page);
    await enterNIPayslipPage.selectAbandon();
  }
);
