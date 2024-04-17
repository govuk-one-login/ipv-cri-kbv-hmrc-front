const moment = require("moment");
const taxYearToRange = require("../utils/tax-year-to-range");

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

  if (question?.info?.currentTaxYear) {
    Object.assign(data, taxYearToRange(question?.info?.currentTaxYear));
  }

  const inset = translate(key, data);

  if (inset && !inset.includes(question.questionKey)) {
    return inset;
  }

  return " ";
};
