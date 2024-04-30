const loadQuestionController = require("./controllers/load-question");
const singleAmountQuestionController = require("./controllers/single-amount-question");
const proveIdentityAnotherWayController = require("./controllers/prove-identity-another-way");
const selfAssessmentRouterController = require("./controllers/self-assessment-router");
const selfAssessmentQuestionController = require("./controllers/self-assessment-question");
const selfAssessmentPaymentController = require("./controllers/self-assessment-payment");

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
  "/question/enter-statutory-shared-parental-pay-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-statutory-adoption-pay-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-statutory-maternity-pay-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-student-loan-deductions-p60": {
    backLink: null,
    controller: singleAmountQuestionController,
    next: "load-question",
  },
  "/question/enter-employees-contributions-p60": {
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
  "/question/enter-recent-tax-credits-payment": {
    backLink: null,
    fields: ["tc-amount"],
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
        next: "/kbv/question/enter-pensions-benefits-self-assessment",
      },
      {
        field: "selfAssessmentRouter",
        value: "sa200",
        next: "/kbv/question/enter-pensions-benefits-short-tax-return",
      },
    ],
  },
  "/question/enter-pensions-benefits-self-assessment": {
    backLink: null,
    template: "pensions-benefits-self-assessment",
    fields: [
      "statePension",
      "otherPension",
      "employmentAndSupportAllowance",
      "jobSeekersAllowance",
      "statePensionAndBenefits",
    ],
    controller: selfAssessmentQuestionController,
    next: "load-question",
  },
  "/question/enter-pensions-benefits-short-tax-return": {
    backLink: null,
    template: "pensions-benefits-short-tax-return",
    fields: [
      "statePensionShort",
      "otherPensionShort",
      "employmentAndSupportAllowanceShort",
      "jobSeekersAllowanceShort",
      "statePensionAndBenefitsShort",
    ],
    controller: selfAssessmentQuestionController,
    next: "load-question",
  },
  "/question/enter-recent-self-assessment-payment": {
    backLink: null,
    template: "self-assessment-payment",
    fields: ["selfAssessmentPaymentDate", "selfAssessmentPaymentAmount"],
    controller: selfAssessmentPaymentController,
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
