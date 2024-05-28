const {
  numericWithOptionalDecimalZeros,
  numericWithOptionalDecimal,
  numericWithRequiredDecimals,
} = require("./fieldsHelper");
const constants = require("../../constants/question-keys");

const amountFieldValidateRequiredAndAmountWithDecimals = {
  type: "text",
  validate: [
    "required",
    {
      type: "regexNumeric",
      fn: (value) => !!value.match(numericWithOptionalDecimal),
    },
    {
      type: "regexPoundsAndPence",
      fn: (value) => !!value.match(numericWithRequiredDecimals),
    },
  ],
  classes: "govuk-input--width-5",
};

module.exports = {
  [constants.ITA_BANKACCOUNT]: {
    type: "text",
    journeyKey: "itabankaccount",
    validate: ["required", "numeric", { type: "exactlength", arguments: [4] }],
  },
  [constants.RTI_P60_EARNINGS_ABOVE_PT]: {
    type: "text",
    validate: [
      "required",
      {
        type: "regex",
        arguments: [numericWithOptionalDecimalZeros],
      },
    ],
    stripDecimal: true,
  },
  [constants.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS]: {
    type: "text",
    validate: [
      "required",
      {
        type: "regex",
        arguments: [numericWithOptionalDecimalZeros],
      },
    ],
    stripDecimal: true,
  },
  [constants.RTI_P60_STUDENT_LOAN_DEDUCTIONS]: {
    type: "text",
    validate: [
      "required",
      {
        type: "regex",
        arguments: [numericWithOptionalDecimalZeros],
      },
    ],
    stripDecimal: true,
  },
  [constants.RTI_P60_STATUTORY_MATERNITY_PAY]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_PAYSLIP_NATIONAL_INSURANCE]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_PAYSLIP_INCOME_TAX]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.TC_AMOUNT]: amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_P60_PAYMENT_FOR_YEAR]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  [constants.RTI_P60_STATUTORY_ADOPTION_PAY]:
    amountFieldValidateRequiredAndAmountWithDecimals,
  abandonRadio: {
    type: "radios",
    items: ["stop", "continue"],
    validate: ["required"],
  },
  selfAssessmentRouter: {
    type: "radios",
    items: ["sa100", "sa200"],
    validate: ["required"],
  },
  statePension: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  otherPension: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  employmentAndSupportAllowance: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  jobSeekersAllowance: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  statePensionAndBenefits: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  statePensionShort: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  otherPensionShort: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  employmentAndSupportAllowanceShort: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  jobSeekersAllowanceShort: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  statePensionAndBenefitsShort: {
    type: "text",
    validate: ["required", "numeric"],
    classes: "govuk-input--width-5",
  },
  selfAssessmentPaymentDate: {
    type: "date",
    validate: ["required", "date", { type: "before", arguments: [] }],
  },
  selfAssessmentPaymentAmount: amountFieldValidateRequiredAndAmountWithDecimals,
};
