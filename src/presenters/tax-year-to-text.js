module.exports = function (question) {
  const data = {};

  if (question?.info?.currentTaxYear) {
    const currentTaxYear = question.info.currentTaxYear;
    const [startYear] = currentTaxYear.split("/");
    const formattedYear = `${startYear} to ${parseInt(startYear, 10) + 1}`;
    data.yearRange = formattedYear;
  }

  return data;
};
