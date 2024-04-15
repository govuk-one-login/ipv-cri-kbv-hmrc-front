const presenters = require("../../../../src/presenters");

Date.now = jest.fn(() => new Date("2024-05-01"));

describe("tax-year-to-text", () => {
  let question;
  const taxYear = "2022/23";
  const formattedTaxYear = "2022 to 2023";

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
    const result = presenters.taxYearToText(question);

    expect(result).toEqual({});
  });

  describe("with currentTaxYear defined", () => {
    it("should return object with yearRange when currentTaxYear is defined", () => {
      const result = presenters.taxYearToText(question);

      expect(result).toEqual({ yearRange: formattedTaxYear });
    });
  });
});
