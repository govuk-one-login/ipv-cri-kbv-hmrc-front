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
      type: "regex",
      arguments: [numericWithRequiredDecimals],
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
  "rti-payslip-national-insurance":
    amountFieldValidateRequiredAndAmountWithDecimals,
  "rti-payslip-income-tax": amountFieldValidateRequiredAndAmountWithDecimals,
  "tc-amount": amountFieldValidateRequiredAndAmountWithDecimals,
  "rti-p60-employee-ni-contributions":
    amountFieldValidateRequiredAndAmountWithDecimals,
  "rti-p60-payment-for-year": amountFieldValidateRequiredAndAmountWithDecimals,
  "rti-p60-statutory-shared-parental-pay":
    amountFieldValidateRequiredAndAmountWithDecimals,
  "rti-p60-statutory-adoption-pay":
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
  },
  selfAssessmentPaymentAmount: amountFieldValidateRequiredAndAmountWithDecimals,
};
