const loadQuestionController = require("./controllers/load-question");
const singleAmountQuestionController = require("./controllers/single-amount-question");
const proveIdentityAnotherWayController = require("./controllers/prove-identity-another-way");
const selfAssessmentRouterController = require("./controllers/self-assessment-router");

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
    backLink: null,
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
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-tax-payslip": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-total-for-year-p60": {
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-earnings-above-pt-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-postgraduate-loan-deductions-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-4-digits-bank-account-tax-credits": {
    backLink: null,
    fields: ["ita-bankaccount"],
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/what-type-self-assessment": {
    template: "self-assessment-router",
    backLink: null,
    entryPoint: true,
    fields: ["selfAssessmentRouter"],
    controller: selfAssessmentRouterController,
    next: [
      {
        field: "selfAssessmentRouter",
        value: "sa100",
        next: "sa100",
      },
      {
        field: "selfAssessmentRouter",
        value: "sa200",
        next: "sa200",
      },
    ],
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
        next: "/oauth2/callback",
      },
      {
        field: "abandonRadio",
        value: "continue",
        next: [
          {
            fn: loadQuestionController.prototype.hasQuestion,
            next: "load-question",
          },
          "answer-security-questions",
        ],
      },
    ],
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
