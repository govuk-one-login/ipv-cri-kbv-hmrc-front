const {
  numericWithOptionalDecimalZeros,
  numericWithOptionalDecimal,
  numericWithRequiredDecimals,
} = require("./fieldsHelper");
const { APP } = require("../../lib/config");

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
  [APP.QUESTION_KEYS.ITA_BANKACCOUNT]: {
    type: "text",
    validate: ["required", "numeric", { type: "exactlength", arguments: [4] }],
  },
  [APP.QUESTION_KEYS.RTI_P60_EARNINGS_ABOVE_PT]:
    validateRequiredAmountWithPounds,
  [APP.QUESTION_KEYS.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS]:
    validateRequiredAmountWithPounds,
  [APP.QUESTION_KEYS.RTI_P60_STUDENT_LOAN_DEDUCTIONS]:
    validateRequiredAmountWithPounds,
  [APP.QUESTION_KEYS.RTI_P60_STATUTORY_MATERNITY_PAY]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_PAYSLIP_NATIONAL_INSURANCE]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_PAYSLIP_INCOME_TAX]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.TC_AMOUNT]: validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_P60_PAYMENT_FOR_YEAR]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY]:
    validateRequiredAmountWithPoundsAndPence,
  [APP.QUESTION_KEYS.RTI_P60_STATUTORY_ADOPTION_PAY]:
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
  [APP.FIELDS.STATE_PENSION]: validateRequiredAmountWithPounds,
  [APP.FIELDS.OTHER_PENSION]: validateRequiredAmountWithPounds,
  [APP.FIELDS.EMPLOYMENT_AND_SUPPORT_ALLOWANCE]:
    validateRequiredAmountWithPounds,
  [APP.FIELDS.JOB_SEEKERS_ALLOWANCE]: validateRequiredAmountWithPounds,
  [APP.FIELDS.STATE_PENSION_AND_BENEFITS]: validateRequiredAmountWithPounds,
  [APP.FIELDS.STATE_PENSION_SHORT]: validateRequiredAmountWithPounds,
  [APP.FIELDS.OTHER_PENSION_SHORT]: validateRequiredAmountWithPounds,
  [APP.FIELDS.EMPLOYMENT_AND_SUPPORT_ALLOWANCE_SHORT]:
    validateRequiredAmountWithPounds,
  [APP.FIELDS.JOB_SEEKERS_ALLOWANCE_SHORT]: validateRequiredAmountWithPounds,
  [APP.FIELDS.STATE_PENSION_AND_BENEFITS_SHORT]:
    validateRequiredAmountWithPounds,
  [APP.FIELDS.SELF_ASSESSMENT_PAYMENT_DATE]: {
    type: "date",
    validate: ["required", "date", { type: "before", arguments: [] }],
  },
  [APP.FIELDS.SELF_ASSESSMENT_PAYMENT_AMOUNT]:
    validateRequiredAmountWithPoundsAndPence,
};
