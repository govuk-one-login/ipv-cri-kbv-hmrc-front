const startController = require("./controllers/start");
const loadQuestionController = require("./controllers/load-question");
const SingleInputQuestionController = require("./controllers/single-input-question");
const selfAssessmentRouterController = require("./controllers/self-assessment-router");
const SelfAssessmentTaxReturnQuestionController = require("./controllers/self-assessment-tax-return-question");
const selfAssessmentPaymentQuestionController = require("./controllers/self-assessment-payment-question");
const { APP } = require("../../lib/config");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: startController,
    next: "answer-security-questions",
  },
  [`${APP.PATHS.ANSWER_SECURITY_QUESTIONS}`]: {
    next: "load-question",
  },
  [`${APP.PATHS.LOAD_QUESTION}`]: {
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
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_NATIONAL_INSURANCE_PAYSLIP}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_PAYSLIP_NATIONAL_INSURANCE],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_TAX_PAYSLIP}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_PAYSLIP_INCOME_TAX],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_TOTAL_FOR_YEAR_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_PAYMENT_FOR_YEAR],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_EARNINGS_ABOVE_PT_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_EARNINGS_ABOVE_PT],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_POSTGRADUATE_LOAN_DEDUCTIONS_P60}`]:
    {
      backLink: null,
      controller: SingleInputQuestionController,
      fields: [APP.QUESTION_KEY.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS],
      next: "load-question",
    },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_STATUTORY_SHARED_PARENTAL_PAY_P60}`]:
    {
      backLink: null,
      controller: SingleInputQuestionController,
      fields: [APP.QUESTION_KEY.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY],
      next: "load-question",
    },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_STATUTORY_ADOPTION_PAY_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_STATUTORY_ADOPTION_PAY],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_STATUTORY_MATERNITY_PAY_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_STATUTORY_MATERNITY_PAY],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_STUDENT_LOAN_DEDUCTIONS_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_STUDENT_LOAN_DEDUCTIONS],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_EMPLOYEES_CONTRIBUTIONS_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [APP.QUESTION_KEY.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS],
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_4_DIGITS_BANK_ACCOUNT_TAX_CREDITS}`]:
    {
      backLink: null,
      fields: [APP.QUESTION_KEY.ITA_BANKACCOUNT],
      controller: SingleInputQuestionController,
      next: "load-question",
    },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_RECENT_TAX_CREDITS_PAYMENT}`]: {
    backLink: null,
    fields: [APP.QUESTION_KEY.TC_AMOUNT],
    controller: SingleInputQuestionController,
    next: "load-question",
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.WHAT_TYPE_SELF_ASSESSMENT}`]: {
    template: "self-assessment-router",
    backLink: null,
    entryPoint: true,
    fields: [APP.FIELDS.SELF_ASSESSMENT_ROUTER],
    controller: selfAssessmentRouterController,
    next: [
      {
        field: APP.FIELDS.SELF_ASSESSMENT_ROUTER,
        value: "sa100",
        next: "question/enter-pensions-benefits-self-assessment",
      },
      {
        field: APP.FIELDS.SELF_ASSESSMENT_ROUTER,
        value: "sa200",
        next: "question/enter-pensions-benefits-short-tax-return",
      },
    ],
  },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_PENSION_BENEFITS_SELF_ASSESSMENT}`]:
    {
      backLink: null,
      template: "pensions-benefits-self-assessment",
      fields: [
        APP.FIELDS.STATE_PENSION,
        APP.FIELDS.OTHER_PENSION,
        APP.FIELDS.EMPLOYMENT_AND_SUPPORT_ALLOWANCE,
        APP.FIELDS.JOB_SEEKERS_ALLOWANCE,
        APP.FIELDS.STATE_PENSION_AND_BENEFITS,
      ],
      controller: SelfAssessmentTaxReturnQuestionController,
      next: "load-question",
    },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_PENSION_BENEFITS_SHORT_TAX_RETURN}`]:
    {
      backLink: null,
      template: "pensions-benefits-short-tax-return",
      fields: [
        APP.FIELDS.STATE_PENSION_SHORT,
        APP.FIELDS.OTHER_PENSION_SHORT,
        APP.FIELDS.EMPLOYMENT_AND_SUPPORT_ALLOWANCE_SHORT,
        APP.FIELDS.JOB_SEEKERS_ALLOWANCE_SHORT,
        APP.FIELDS.STATE_PENSION_AND_BENEFITS_SHORT,
      ],
      controller: SelfAssessmentTaxReturnQuestionController,
      next: "load-question",
    },
  [`${APP.PATHS.QUESTION}${APP.PATHS.ENTER_RECENT_SELF_ASSESSMENT_PAYMENT}`]: {
    backLink: null,
    template: "self-assessment-payment",
    fields: [
      APP.FIELDS.SELF_ASSESSMENT_PAYMENT_DATE,
      APP.FIELDS.SELF_ASSESSMENT_PAYMENT_AMOUNT,
    ],
    controller: selfAssessmentPaymentQuestionController,
    next: "load-question",
  },
  [`${APP.PATHS.PROVE_IDENTITY_ANOTHER_WAY}`]: {
    backLink: null,
    entryPoint: true,
    fields: [APP.FIELDS.ABANDON_RADIO],
    next: [
      {
        field: APP.FIELDS.ABANDON_RADIO,
        value: "stop",
        next: APP.PATHS.OAUTH2_CALLBACK_PATH,
      },
      {
        field: APP.FIELDS.ABANDON_RADIO,
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
  [`${APP.PATHS.DONE}`]: {
    skip: true,
    noPost: true,
    next: APP.PATHS.OAUTH2_CALLBACK_PATH,
  },
};
