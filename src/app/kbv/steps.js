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
    backLink: null,
    entryPoint: true,
    prereqs: ["/load-question"],
    fields: ["abandonRadio"],
    controller: proveIdentityAnotherWayController,
    next: [
      {
        field: "abandonRadio",
        value: "continue",
        next: "load-question",
      },
      "/oauth2/callback?error=access_denied",
    ],
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
