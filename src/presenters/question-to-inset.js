const taxYearToRange = require("../utils/tax-year-to-range");
const monthsAgoToDate = require("../utils/months-ago-to-date");

module.exports = function (question, translate, language) {
  const key = `pages.${question.questionKey}.inset`;
  const data = {};

  if (question?.info?.months) {
    Object.assign(data, monthsAgoToDate(question?.info?.months, language));
  }

  if (question?.info?.currentTaxYear && question?.info?.previousTaxYear) {
    Object.assign(
      data,
      taxYearToRange(
        question.info.currentTaxYear,
        question.info.previousTaxYear
      )
    );
  } else if (question?.info?.currentTaxYear) {
    Object.assign(data, taxYearToRange(question.info.currentTaxYear));
  }

  const inset = translate(key, data);

  if (inset && typeof inset === "object" && "html" in inset) {
    return inset;
  }

  return "";
};
