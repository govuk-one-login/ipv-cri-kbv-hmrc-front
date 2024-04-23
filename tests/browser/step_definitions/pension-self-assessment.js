const { Then, When } = require("@cucumber/cucumber");
const {
  PensionsBenefitsSelfAssessmentPage,
  PensionsBenefitsShortTaxReturnPage,
} = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the pensions-benefits-self-assessment question page",
  async function () {
    const pensionShortPage = new PensionsBenefitsSelfAssessmentPage(this.page);
    expect(pensionShortPage.isCurrentPage()).to.be.true;
  }
);

Then(
  "they should see the pensions-benefits-short-tax-return question page",
  async function () {
    const pensionShortPage = new PensionsBenefitsShortTaxReturnPage(this.page);
    expect(pensionShortPage.isCurrentPage()).to.be.true;
  }
);

When("they enter correct pension details", async function () {
  const pensionShortPage = new PensionsBenefitsSelfAssessmentPage(this.page);
  await pensionShortPage.answer();
  await pensionShortPage.continue();
});
