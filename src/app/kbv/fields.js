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
  },
  otherPension: {
    type: "text",
    validate: ["required", "numeric"],
  },
  employmentAndSupportAllowance: {
    type: "text",
    validate: ["required", "numeric"],
  },
  jobSeekersAllowance: {
    type: "text",
    validate: ["required", "numeric"],
  },
  statePensionAndBenefits: {
    type: "text",
    validate: ["required", "numeric"],
  },
  statePensionShort: {
    type: "text",
    validate: ["required", "numeric"],
  },
  otherPensionShort: {
    type: "text",
    validate: ["required", "numeric"],
  },
  employmentAndSupportAllowanceShort: {
    type: "text",
    validate: ["required", "numeric"],
  },
  jobSeekersAllowanceShort: {
    type: "text",
    validate: ["required", "numeric"],
  },
  statePensionAndBenefitsShort: {
    type: "text",
    validate: ["required", "numeric"],
  },
};
