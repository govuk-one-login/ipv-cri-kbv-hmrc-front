const moment = require("moment");
const monthsAgoToDate = require("../../../../src/utils/months-ago-to-date");

describe("months-ago-to-date", () => {
  const language = "en";

  beforeEach(() => {
    moment.locale(language);
  });

  it("should return empty object when months is undefined", () => {
    const result = monthsAgoToDate(undefined, language);

    expect(result).toEqual({});
  });

  it("should return object with dynamicDate when months is defined", () => {
    const months = "3";
    const dynamicDate = moment()
      .subtract(months, "months")
      .locale(language)
      .format("D MMMM YYYY");

    const result = monthsAgoToDate(months, language);

    expect(result).toEqual({ dynamicDate });
  });
});
