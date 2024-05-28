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
  const answer = { day: "11", month: "11", year: "2023", amount: "2000.22" };
  await pensionShortPage.answer(answer);
  await pensionShortPage.continue();
});

When("they enter wrong self assessment payment details", async function () {
  const pensionShortPage = new SelfAssessmentPaymentPage(this.page);
  const answer = { day: "45", month: "11", year: "2023", amount: "2000.22" };
  await pensionShortPage.answer(answer);
  await pensionShortPage.continue();
});

Then(
  "they should see the enter-recent-self-assessment-payment question page with error",
  async function () {
    const selfAssessmentPage = new SelfAssessmentPaymentPage(this.page);
    expect(selfAssessmentPage.isCurrentPage()).to.be.true;
    expect(selfAssessmentPage.hasErrorSummary).to.not.be.false;
  }
);
