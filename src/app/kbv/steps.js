const startController = require("./controllers/start");
const loadQuestionController = require("./controllers/load-question");
const SingleInputQuestionController = require("./controllers/single-input-question");
const selfAssessmentRouterController = require("./controllers/self-assessment-router");
const SelfAssessmentTaxReturnQuestionController = require("./controllers/self-assessment-tax-return-question");
const selfAssessmentPaymentQuestionController = require("./controllers/self-assessment-payment-question");
const questionKeys = require("../../constants/question-keys");
const routes = require("../../constants/routes");
const fields = require("../../constants/fields");

module.exports = {
  [routes.BASE_PATH]: {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    controller: startController,
    next: routes.ANSWER_SECURITY_QUESTIONS,
  },
  [`${routes.BASE_PATH}${routes.ANSWER_SECURITY_QUESTIONS}`]: {
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_PATH}${routes.LOAD_QUESTION}`]: {
    backLink: null,
    controller: loadQuestionController,
    skip: true,
    next: [
      {
        fn: loadQuestionController.prototype.hasQuestion,
        next: loadQuestionController.prototype.getQuestionPath,
      },
      routes.DONE,
    ],
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_NATIONAL_INSURANCE_PAYSLIP}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_PAYSLIP_NATIONAL_INSURANCE],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_TAX_PAYSLIP}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_PAYSLIP_INCOME_TAX],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_TOTAL_FOR_YEAR_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_PAYMENT_FOR_YEAR],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_EARNINGS_ABOVE_PT_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_EARNINGS_ABOVE_PT],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_POSTGRADUATE_LOAN_DEDUCTIONS_P60}`]:
    {
      backLink: null,
      controller: SingleInputQuestionController,
      fields: [questionKeys.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS],
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_STATUTORY_SHARED_PARENTAL_PAY_P60}`]:
    {
      backLink: null,
      controller: SingleInputQuestionController,
      fields: [questionKeys.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY],
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_STATUTORY_ADOPTION_PAY_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_STATUTORY_ADOPTION_PAY],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_STATUTORY_MATERNITY_PAY_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_STATUTORY_MATERNITY_PAY],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_STUDENT_LOAN_DEDUCTIONS_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_STUDENT_LOAN_DEDUCTIONS],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_EMPLOYEES_CONTRIBUTIONS_P60}`]: {
    backLink: null,
    controller: SingleInputQuestionController,
    fields: [questionKeys.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS],
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_4_DIGITS_BANK_ACCOUNT_TAX_CREDITS}`]:
    {
      backLink: null,
      fields: [questionKeys.ITA_BANKACCOUNT],
      controller: SingleInputQuestionController,
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_RECENT_TAX_CREDITS_PAYMENT}`]: {
    backLink: null,
    fields: [questionKeys.TC_AMOUNT],
    controller: SingleInputQuestionController,
    next: routes.LOAD_QUESTION,
  },
  [`${routes.BASE_QUESTION_PATH}${routes.WHAT_TYPE_SELF_ASSESSMENT}`]: {
    template: "self-assessment-router",
    backLink: null,
    entryPoint: true,
    fields: [fields.SELF_ASSESSMENT_ROUTER],
    controller: selfAssessmentRouterController,
    next: [
      {
        field: fields.SELF_ASSESSMENT_ROUTER,
        value: "sa100",
        next: `${routes.BASE_KBV_QUESTION_PATH}${routes.ENTER_PENSION_BENEFITS_SELF_ASSESSMENT}`,
      },
      {
        field: fields.SELF_ASSESSMENT_ROUTER,
        value: "sa200",
        next: `${routes.BASE_KBV_QUESTION_PATH}${routes.ENTER_PENSION_BENEFITS_SHORT_TAX_RETURN}`,
      },
    ],
  },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_PENSION_BENEFITS_SELF_ASSESSMENT}`]:
    {
      backLink: null,
      template: "pensions-benefits-self-assessment",
      fields: [
        fields.STATE_PENSION,
        fields.OTHER_PENSION,
        fields.EMPLOYMENT_AND_SUPPORT_ALLOWANCE,
        fields.JOB_SEEKERS_ALLOWANCE,
        fields.STATE_PENSION_AND_BENEFITS,
      ],
      controller: SelfAssessmentTaxReturnQuestionController,
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_PENSION_BENEFITS_SHORT_TAX_RETURN}`]:
    {
      backLink: null,
      template: "pensions-benefits-short-tax-return",
      fields: [
        fields.STATE_PENSION_SHORT,
        fields.OTHER_PENSION_SHORT,
        fields.EMPLOYMENT_AND_SUPPORT_ALLOWANCE_SHORT,
        fields.JOB_SEEKERS_ALLOWANCE_SHORT,
        fields.STATE_PENSION_AND_BENEFITS_SHORT,
      ],
      controller: SelfAssessmentTaxReturnQuestionController,
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_QUESTION_PATH}${routes.ENTER_RECENT_SELF_ASSESSMENT_PAYMENT}`]:
    {
      backLink: null,
      template: "self-assessment-payment",
      fields: [
        fields.SELF_ASSESSMENT_PAYMENT_DATE,
        fields.SELF_ASSESSMENT_PAYMENT_AMOUNT,
      ],
      controller: selfAssessmentPaymentQuestionController,
      next: routes.LOAD_QUESTION,
    },
  [`${routes.BASE_PATH}${routes.PROVE_IDENTITY_ANOTHER_WAY}`]: {
    backLink: null,
    entryPoint: true,
    fields: [fields.ABANDON_RADIO],
    next: [
      {
        field: fields.ABANDON_RADIO,
        value: "stop",
        next: routes.OAUTH2_CALLBACK_PATH,
      },
      {
        field: fields.ABANDON_RADIO,
        value: "continue",
        next: [
          {
            fn: loadQuestionController.prototype.hasQuestion,
            next: routes.LOAD_QUESTION,
          },
          routes.ANSWER_SECURITY_QUESTIONS,
        ],
      },
    ],
  },
  [`${routes.BASE_PATH}${routes.DONE}`]: {
    skip: true,
    noPost: true,
    next: routes.OAUTH2_CALLBACK_PATH,
  },
};
