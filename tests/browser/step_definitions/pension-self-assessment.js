const { Then, When } = require("@cucumber/cucumber");
const {
  PensionsBenefitsSelfAssessmentPage,
  PensionsBenefitsShortTaxReturnPage,
} = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the pensions-benefits-self-assessment question page",
  async function () {
    const page = new PensionsBenefitsSelfAssessmentPage(this.page);
    expect(page.isCurrentPage()).to.be.true;
  }
);

Then(
  "they should see the pensions-benefits-short-tax-return question page",
  async function () {
    const page = new PensionsBenefitsShortTaxReturnPage(this.page);
    expect(page.isCurrentPage()).to.be.true;
  }
);

When("they enter correct pension details", async function () {
  const page = this.page
    .url()
    .includes("enter-pensions-benefits-short-tax-return")
    ? new PensionsBenefitsShortTaxReturnPage(this.page)
    : new PensionsBenefitsSelfAssessmentPage(this.page);

  await page.answer();
  await page.continue();
});

When("they enter invalid pension details", async function () {
  const page = this.page
    .url()
    .includes("enter-pensions-benefits-short-tax-return")
    ? new PensionsBenefitsShortTaxReturnPage(this.page)
    : new PensionsBenefitsSelfAssessmentPage(this.page);

  await page.answerWithInvalidValues();
  await page.continue();
});

When("they enter empty pension details", async function () {
  const page = this.page
    .url()
    .includes("enter-pensions-benefits-short-tax-return")
    ? new PensionsBenefitsShortTaxReturnPage(this.page)
    : new PensionsBenefitsSelfAssessmentPage(this.page);

  await page.answerWithEmptyValues();
  await page.continue();
});

Then("they should see error messages", async function () {
  const page = this.page
    .url()
    .includes("enter-pensions-benefits-short-tax-return")
    ? new PensionsBenefitsShortTaxReturnPage(this.page)
    : new PensionsBenefitsSelfAssessmentPage(this.page);

  expect(page.hasErrorSummary).to.not.be.false;
});
