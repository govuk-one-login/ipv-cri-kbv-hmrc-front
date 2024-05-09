const { Then, When } = require("@cucumber/cucumber");
const { AnswerP60QuestionsPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the {string} question page", async function () {
  const p60QuestionPage = new AnswerP60QuestionsPage(this.page);

  expect(p60QuestionPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount and continue from the {string} question page",
  async function () {
    const p60QuestionPage = new AnswerP60QuestionsPage(this.page);
    await p60QuestionPage.answer("1234");
    await p60QuestionPage.continue();
  }
);

