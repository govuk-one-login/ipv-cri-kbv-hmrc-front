const moment = require("moment");
const taxCreditsMonths = require("../../../../src/utils/tax-credits-months");

describe("tax-credits-months", () => {
  const language = "en";

  beforeEach(() => {
    moment.locale(language);
  });

  it("should return empty object when months is undefined", () => {
    const result = taxCreditsMonths(undefined, language);

    expect(result).toEqual({});
  });

  it("should return object with dynamicDate when months is defined", () => {
    const months = "3";
    const dynamicDate = moment()
      .subtract(months, "months")
      .locale(language)
      .format("D MMMM YYYY");

    const result = taxCreditsMonths(months, language);

    expect(result).toEqual({ dynamicDate });
  });
});
