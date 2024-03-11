const moment = require("moment");

module.exports = function (question, translate, language) {
  const key = `fields.${question.questionKey}.inset`;
  const data = {};

  if (question?.info?.months) {
    const dynamicDate = moment()
      .subtract(question.info.months, "months")
      .locale(language)
      .format("D MMMM YYYY");
    data.dynamicDate = dynamicDate;
  }

  const inset = translate(key, data);

  if (inset && !inset.includes(question.questionKey)) {
    return inset;
  }

  return " ";
};
