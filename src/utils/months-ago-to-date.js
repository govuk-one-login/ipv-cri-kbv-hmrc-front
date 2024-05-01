const moment = require("moment");

module.exports = function (months, language) {
  const data = {};

  if (months) {
    const dynamicDate = moment()
      .subtract(months, "months")
      .locale(language)
      .format("D MMMM YYYY");
    data.dynamicDate = dynamicDate;
  }

  return data;
};
