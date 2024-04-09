module.exports = function (question, translate) {
  const key = `fields.${question.questionKey}.title`;
  const data = {};

  if (question?.info?.currentTaxYear) {
    const currentTaxYear = question.info.currentTaxYear;

    const [startYear] = currentTaxYear.split("/");

    const formattedYear = `${startYear} to ${parseInt(startYear, 10) + 1}`;

    data.yearRange = formattedYear;
  }

  const title = translate(key, data);

  if (title && !title.includes(question.questionKey)) {
    return title;
  }

  return "";
};
