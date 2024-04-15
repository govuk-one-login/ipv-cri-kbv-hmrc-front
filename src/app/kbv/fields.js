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
  "self-assessment-router": {
    type: "radios",
    items: ["sa100", "sa200"],
    validate: ["required"],
  },
};
