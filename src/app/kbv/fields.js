const {
  numericWithOptionalDecimalZeros,
  numericWithOptionalDecimal,
  numericWithRequiredDecimals,
} = require("./fieldsHelper");
const questionKeys = require("../../constants/question-keys");

const validateRequiredAmountWithPoundsAndPence = {
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

const validateRequiredAmountWithPounds = {
  type: "text",
  validate: [
    "required",
    {
      type: "regex",
      arguments: [numericWithOptionalDecimalZeros],
    },
  ],
  classes: "govuk-input--width-5",
  stripDecimal: true,
};

module.exports = {
  [questionKeys.ITA_BANKACCOUNT]: {
    type: "text",
    validate: ["required", "numeric", { type: "exactlength", arguments: [4] }],
  },
  [questionKeys.RTI_P60_EARNINGS_ABOVE_PT]: validateRequiredAmountWithPounds,
  [questionKeys.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS]:
    validateRequiredAmountWithPounds,
  [questionKeys.RTI_P60_STUDENT_LOAN_DEDUCTIONS]:
    validateRequiredAmountWithPounds,
  [questionKeys.RTI_P60_STATUTORY_MATERNITY_PAY]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_PAYSLIP_NATIONAL_INSURANCE]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_PAYSLIP_INCOME_TAX]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.TC_AMOUNT]: validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_P60_PAYMENT_FOR_YEAR]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY]:
    validateRequiredAmountWithPoundsAndPence,
  [questionKeys.RTI_P60_STATUTORY_ADOPTION_PAY]:
    validateRequiredAmountWithPoundsAndPence,
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
  statePension: validateRequiredAmountWithPounds,
  otherPension: validateRequiredAmountWithPounds,
  employmentAndSupportAllowance: validateRequiredAmountWithPounds,
  jobSeekersAllowance: validateRequiredAmountWithPounds,
  statePensionAndBenefits: validateRequiredAmountWithPounds,
  statePensionShort: validateRequiredAmountWithPounds,
  otherPensionShort: validateRequiredAmountWithPounds,
  employmentAndSupportAllowanceShort: validateRequiredAmountWithPounds,
  jobSeekersAllowanceShort: validateRequiredAmountWithPounds,
  statePensionAndBenefitsShort: validateRequiredAmountWithPounds,
  selfAssessmentPaymentDate: {
    type: "date",
    validate: ["required", "date", { type: "before", arguments: [] }],
  },
  selfAssessmentPaymentAmount: validateRequiredAmountWithPoundsAndPence,
};
