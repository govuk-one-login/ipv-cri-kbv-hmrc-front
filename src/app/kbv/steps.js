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
  "/question/enter-tax-payslip": {
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/prove-identity-another-way": {
    backLink: null,
    entryPoint: true,
    fields: ["abandonRadio"],
    controller: proveIdentityAnotherWayController,
    next: [
      {
        field: "abandonRadio",
        value: "stop",
        next: "/oauth2/callback?error=access_denied",
      },
      {
        fn: proveIdentityAnotherWayController.prototype
          .isQuestionJourneyStarted,
        field: "abandonRadio",
        value: "continue",
        next: "load-question",
      },
      {
        fn: !proveIdentityAnotherWayController.prototype
          .isQuestionJourneyStarted,
        field: "abandonRadio",
        value: "continue",
        next: "answer-security-questions",
      },
    ],
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
