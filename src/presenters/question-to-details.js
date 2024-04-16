module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.details`;
  const details = translate(key);

  if (
    details &&
    typeof details === "object" &&
    "summaryText" in details &&
    "html" in details
  ) {
    return details;
  }

  return " ";
};
