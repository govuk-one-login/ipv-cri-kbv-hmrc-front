const questionToHint = require("./question-to-hint");
const questionToLabel = require("./question-to-label");

module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.items`;
  const translatedItems = translate(key) || {};

  // Convert the object to an array of its values
  const items = Object.values(translatedItems);

  return {
    id: question?.questionKey,
    name: question?.questionKey,
    label: questionToLabel(question, translate),
    legend: questionToLabel(question, translate),
    fieldset: {
      legend: {
        isPageHeading: true,
        classes: "govuk-fieldset__legend--l",
      },
    },
    hint: {
      html: questionToHint(question, translate),
    },
    items: items,
  };
};
