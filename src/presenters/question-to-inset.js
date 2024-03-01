const moment = require("moment");

module.exports = function (question, translate, language) {
  const key = `fields.${question.questionKey}.inset`;
  const dynamicDate = moment()
    .subtract(3, "months")
    .locale(language)
    .format("DD MMMM YYYY");
  const inset = translate(key, { dynamicDate });

  if (inset && !inset.includes(question.questionKey)) {
    return inset;
  }

  return " ";
};
