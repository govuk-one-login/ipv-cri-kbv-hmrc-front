const { Then, When } = require("@cucumber/cucumber");
const { AnswerP60QuestionsPage } = require("../pages");
const { expect } = require("chai");

Then("they should see the {string} question page", async function (path) {
  const p60QuestionPage = new AnswerP60QuestionsPage(this.page, String(path));

  expect(p60QuestionPage.isCurrentPage()).to.be.true;
});

When(
  "they enter amount {string} and continue from the {string} question page",
  async function (amount, path) {
    const p60QuestionPage = new AnswerP60QuestionsPage(this.page, String(path));
    await p60QuestionPage.answer(String(amount));
    await p60QuestionPage.continue();
  }
);

When(
  "they do not enter an amount and continue from the {string} question page",
  async function (path) {
    const p60QuestionPage = new AnswerP60QuestionsPage(this.page, String(path));
    await p60QuestionPage.answer("");
    await p60QuestionPage.continue();
  }
);

When(
  "they enter an invalid amount and continue from the {string} question page",
  async function (path) {
    const p60QuestionPage = new AnswerP60QuestionsPage(this.page, String(path));
    await p60QuestionPage.answer("123.123");
    await p60QuestionPage.continue();
  }
);

Then("they should see enter amount error message", async function () {
  const p60QuestionPage = new AnswerP60QuestionsPage(this.page);
  expect(p60QuestionPage.hasErrorSummary).to.not.be.false;
});
