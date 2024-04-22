module.exports = function (taxYear) {
  const data = {};

  if (taxYear) {
    const [startYear] = taxYear.split("/");
    const yearRangeStart = parseInt(startYear, 10);
    const yearRangeEnd = yearRangeStart + 1;

    data.yearRangeStart = yearRangeStart;
    data.yearRangeEnd = yearRangeEnd;
  }

  return data;
};
