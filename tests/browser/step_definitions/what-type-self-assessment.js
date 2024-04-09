const { Then, When } = require("@cucumber/cucumber");
const { WhatTypeSelfAssessment } = require("../pages");
const { expect } = require("chai");

Then(
  "they should see the what-type-self-assessment question page",
  async function () {
    const radionQestionPage = new WhatTypeSelfAssessment(this.page);

    expect(radionQestionPage.isCurrentPage()).to.be.true;
  }
);

When(
  "they select {string} and continue from the what-type-self-assessment question page",
  async function (optionValue) {
    const radioQuestionPage = new WhatTypeSelfAssessment(this.page);
    await radioQuestionPage.selectRadioOption(optionValue);
    await radioQuestionPage.continue();
  }
);
