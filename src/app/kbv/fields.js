module.exports = {
  "ita-bankaccount": {
    type: "text",
    journeyKey: "itabankaccount",
    validate: ["required", "numeric", { type: "exactlength", arguments: [4] }],
  },
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
  selfAssessmentPaymentAmount: {
    type: "text",
    validate: ["required"],
    classes: "govuk-input--width-5",
  },
};
