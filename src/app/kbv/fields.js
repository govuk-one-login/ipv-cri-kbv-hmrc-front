module.exports = {
  "ita-bankaccount" : {
    type: "input",
    validate: [
      "required",
      "numeric",
      { type: "exactlength", arguments: 4 },
    ]
  }
};
