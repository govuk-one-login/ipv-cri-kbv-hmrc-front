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
  "sa-income-from-pensions": {
    type: "radios",
    items: ["sa100", "sa200"],
    validate: ["required"],
  },
};
