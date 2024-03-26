const { Then, When } = require("@cucumber/cucumber");
const { Enter4DigitsBankAccountTaxCredits } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they enter correct account number and continue from the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );
    await singleAmountQuestionPage.answer("1234");
    await singleAmountQuestionPage.continue();
  }
);

When(
  "they not enter account number and continue from the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );
    await singleAmountQuestionPage.answer("");
    await singleAmountQuestionPage.continue();
  }
);

When(
  "they enter invalid account number and continue from the enter-4-digits-bank-account-tax-credits question page",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );
    await singleAmountQuestionPage.answer("W123");
    await singleAmountQuestionPage.continue();
  }
);

Then("they should see enter account number error message", async function () {
  const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
    this.page
  );
  expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
  expect(singleAmountQuestionPage.hasErrorSummary).to.not.be.false;
});

Then(
  "they should see enter correct account number error message",
  async function () {
    const singleAmountQuestionPage = new Enter4DigitsBankAccountTaxCredits(
      this.page
    );

    expect(singleAmountQuestionPage.isCurrentPage()).to.be.true;
    expect(singleAmountQuestionPage.hasErrorSummary).to.not.be.false;
  }
);
