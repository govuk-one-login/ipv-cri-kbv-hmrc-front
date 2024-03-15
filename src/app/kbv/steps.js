const loadQuestionController = require("./controllers/load-question");
const singleAmountQuestionController = require("./controllers/single-amount-question");
const proveIdentityAnotherWayController = require("./controllers/prove-identity-another-way");

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
        fn: loadQuestionController.prototype.isSingleAmountQuestion,
        next: "single-amount-question",
      },
      "done",
    ],
  },
  "/single-amount-question": {
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/prove-identity-another-way": {
    entryPoint: true,
    controller: proveIdentityAnotherWayController,
    backLink: null,
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
