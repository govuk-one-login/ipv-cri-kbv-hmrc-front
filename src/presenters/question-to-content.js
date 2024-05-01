const monthsAgoToDate = require("../utils/months-ago-to-date");

module.exports = function (question, translate, language) {
  const key = `fields.${question.questionKey}.content`;
  const data = {};

  if (question?.info?.months) {
    Object.assign(data, monthsAgoToDate(question?.info?.months, language));
  }

  const content = translate(key, data);

  if (content && !content.includes(question.questionKey)) {
    return content;
  }

  return " ";
};
