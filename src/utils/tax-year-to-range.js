module.exports = function (currentTaxYear, previousTaxYear) {
  const data = {};

  function processTaxYear(taxYear) {
    if (taxYear) {
      const [startYear] = taxYear.split("/");
      const yearRangeStart = parseInt(startYear, 10);
      const yearRangeEnd = yearRangeStart + 1;

      return {
        yearRangeStart: yearRangeStart,
        yearRangeEnd: yearRangeEnd,
      };
    }
    return null;
  }

  const currentData = processTaxYear(currentTaxYear);
  if (currentData) {
    data.currentYearRangeStart = currentData.yearRangeStart;
    data.currentYearRangeEnd = currentData.yearRangeEnd;
  }

  const previousData = processTaxYear(previousTaxYear);
  if (previousData) {
    data.previousYearRangeStart = previousData.yearRangeStart;
    data.previousYearRangeEnd = previousData.yearRangeEnd;
  }

  return data;
};
