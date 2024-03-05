const { Then, When } = require("@cucumber/cucumber");
const { AnswerSecurityQuestionsPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the answer security questions page", async function () {
  const introPage = new AnswerSecurityQuestionsPage(this.page);

  expect(introPage.isCurrentPage()).to.be.true;
});

When("they continue from answer security questions", async function () {
  const introPage = new AnswerSecurityQuestionsPage(this.page);
  await introPage.start();
});
