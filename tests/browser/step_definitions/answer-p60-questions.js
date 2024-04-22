const { Then, When } = require("@cucumber/cucumber");
const { AnswerP60QuestionsPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the {string} question page", async function (path) {
  const p60QuestionPage = new AnswerP60QuestionsPage(this.page, path);

  expect(p60QuestionPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount and continue from the {string} question page",
  async function (path) {
    const p60QuestionPage = new AnswerP60QuestionsPage(this.page, path);
    await p60QuestionPage.answer();
    await p60QuestionPage.continue();
  }
);
