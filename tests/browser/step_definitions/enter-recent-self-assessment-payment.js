const { Then, When } = require("@cucumber/cucumber");
const { SelfAssessmentPaymentPage } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-recent-self-assessment-payment question page",
  async function () {
    const selfAssessmentPage = new SelfAssessmentPaymentPage(this.page);
    expect(selfAssessmentPage.isCurrentPage()).to.be.true;
  }
);

When("they enter correct self assessment payment details", async function () {
  const pensionShortPage = new SelfAssessmentPaymentPage(this.page);
  await pensionShortPage.answer();
  await pensionShortPage.continue();
});
