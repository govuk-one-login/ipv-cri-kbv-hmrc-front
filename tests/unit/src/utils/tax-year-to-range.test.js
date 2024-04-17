const taxYearToRange = require("../../../../src/utils/tax-year-to-range");

Date.now = jest.fn(() => new Date("2024-05-01"));

describe("tax-year-to-range", () => {
  let question;
  const taxYear = "2022/23";
  const yearRangeStart = 2022;
  const yearRangeEnd = 2023;

  beforeEach(() => {
    question = {
      questionKey: "sa-income-from-pensions",
      info: {
        currentTaxYear: taxYear,
      },
    };
  });

  it("should return empty object when currentTaxYear is undefined", () => {
    question.info.currentTaxYear = undefined;
    const result = taxYearToRange(question?.info?.currentTaxYear);

    expect(result).toEqual({});
  });

  describe("with currentTaxYear defined", () => {
    it("should return object with yearRangeStart and yearRangeEnd when currentTaxYear is defined", () => {
      const result = taxYearToRange(question?.info?.currentTaxYear);

      expect(result).toEqual({ yearRangeStart, yearRangeEnd });
    });
  });
});
