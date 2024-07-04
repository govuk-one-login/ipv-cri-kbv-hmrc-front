const {
  numericWithOptionalDecimalZeros,
  numericWithOptionalDecimal,
  numericWithRequiredDecimals,
} = require("./fieldsHelper");
const questionKeys = require("../../constants/question-keys");
const fields = require("../../constants/fields");

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
  [fields.ABANDON_RADIO]: {
    type: "radios",
    items: ["stop", "continue"],
    validate: ["required"],
  },
  [fields.SELF_ASSESSMENT_ROUTER]: {
    type: "radios",
    items: ["sa100", "sa200"],
    validate: ["required"],
  },
  [fields.STATE_PENSION]: validateRequiredAmountWithPounds,
  [fields.OTHER_PENSION]: validateRequiredAmountWithPounds,
  [fields.EMPLOYMENT_AND_SUPPORT_ALLOWANCE]: validateRequiredAmountWithPounds,
  [fields.JOB_SEEKERS_ALLOWANCE]: validateRequiredAmountWithPounds,
  [fields.STATE_PENSION_AND_BENEFITS]: validateRequiredAmountWithPounds,
  [fields.STATE_PENSION_AND_BENEFITS_SHORT]: validateRequiredAmountWithPounds,
  [fields.OTHER_PENSION_SHORT]: validateRequiredAmountWithPounds,
  [fields.EMPLOYMENT_AND_SUPPORT_ALLOWANCE_SHORT]:
    validateRequiredAmountWithPounds,
  [fields.JOB_SEEKERS_ALLOWANCE_SHORT]: validateRequiredAmountWithPounds,
  [fields.STATE_PENSION_AND_BENEFITS_SHORT]: validateRequiredAmountWithPounds,
  [fields.SELF_ASSESSMENT_PAYMENT_DATE]: {
    type: "date",
    validate: ["required", "date", { type: "before", arguments: [] }],
  },
  [fields.SELF_ASSESSMENT_PAYMENT_AMOUNT]:
    validateRequiredAmountWithPoundsAndPence,
};
