const loadQuestionController = require("./controllers/load-question");
const singleAmountQuestionController = require("./controllers/single-amount-question");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "answer-security-questions",
  },
  "/answer-security-questions": {
    next: "load-question",
  },
  "/load-question": {
    controller: loadQuestionController,
    skip: true,
    next: [
      {
        fn: loadQuestionController.prototype.hasQuestion,
        next: loadQuestionController.prototype.getQuestionPath,
      },
      "done",
    ],
  },
  "/question/enter-national-insurance-payslip": {
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
