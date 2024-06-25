const startController = require("./controllers/start");
const loadQuestionController = require("./controllers/load-question");
const SingleInputQuestionController = require("./controllers/single-input-question");
const selfAssessmentRouterController = require("./controllers/self-assessment-router");
const SelfAssessmentTaxReturnQuestionController = require("./controllers/self-assessment-tax-return-question");
const selfAssessmentPaymentQuestionController = require("./controllers/self-assessment-payment-question");
const constants = require("../../constants/question-keys");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: startController,
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
    controller: SingleInputQuestionController,
    fields: [constants.RTI_PAYSLIP_NATIONAL_INSURANCE],
    next: "load-question",
  },
  "/question/enter-tax-payslip": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_PAYSLIP_INCOME_TAX],
    next: "load-question",
  },
  "/question/enter-total-for-year-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_PAYMENT_FOR_YEAR],
    next: "load-question",
  },
  "/question/enter-earnings-above-pt-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_EARNINGS_ABOVE_PT],
    next: "load-question",
  },
  "/question/enter-postgraduate-loan-deductions-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS],
    next: "load-question",
  },
  "/question/enter-statutory-shared-parental-pay-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY],
    next: "load-question",
  },
  "/question/enter-statutory-adoption-pay-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_STATUTORY_ADOPTION_PAY],
    next: "load-question",
  },
  "/question/enter-statutory-maternity-pay-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_STATUTORY_MATERNITY_PAY],
    next: "load-question",
  },
  "/question/enter-student-loan-deductions-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_STUDENT_LOAN_DEDUCTIONS],
    next: "load-question",
  },
  "/question/enter-employees-contributions-p60": {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [constants.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS],
    next: "load-question",
  },
  "/question/enter-4-digits-bank-account-tax-credits": {
    backLink: null,
    fields: [constants.ITA_BANKACCOUNT],
    controller: SingleInputQuestionController,
    next: "load-question",
  },
  "/question/enter-recent-tax-credits-payment": {
    backLink: null,
    fields: [constants.TC_AMOUNT],
    controller: SingleInputQuestionController,
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
    controller: SelfAssessmentTaxReturnQuestionController,
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
    controller: SelfAssessmentTaxReturnQuestionController,
    next: "load-question",
  },
  "/question/enter-recent-self-assessment-payment": {
    backLink: null,
    template: "self-assessment-payment",
    fields: ["selfAssessmentPaymentDate", "selfAssessmentPaymentAmount"],
    controller: selfAssessmentPaymentQuestionController,
    next: "load-question",
  },
  "/prove-identity-another-way": {
    backLink: null,
    entryPoint: true,
    fields: ["abandonRadio"],
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
