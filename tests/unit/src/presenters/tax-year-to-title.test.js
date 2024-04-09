const presenters = require("../../../../src/presenters");

Date.now = jest.fn(() => new Date("2024-05-01"));

describe("tax-year-to-title", () => {
  let translate;
  let question;
  let data;
  const englishLanguage = "en";
  const welshLanguage = "cy";
  const taxYear = "2022/23";
  const formattedTaxYear = "2022 to 2023"; // Adjusted formatted tax year

  beforeEach(() => {
    question = {
      questionKey: "sa-income-from-pensions",
      info: {
        currentTaxYear: taxYear,
      },
    };
    data = { yearRange: formattedTaxYear };

    translate = jest.fn();
  });

  it("should call translate using questionKey without currentTaxYear when currentTaxYear is undefined", () => {
    question.info.currentTaxYear = undefined;
    presenters.taxYearToTitle(question, translate, englishLanguage);

    expect(translate).toHaveBeenCalledWith(
      "fields.sa-income-from-pensions.title",
      {}
    );
  });

  it("should return empty string when translation not present", () => {
    translate.mockReturnValue(undefined);
    const title = presenters.taxYearToTitle(
      question,
      translate,
      englishLanguage
    );

    expect(title).toBe("");
  });

  describe("with translation key found", () => {
    it("should return english language translated content with the formatted tax year", () => {
      translate.mockReturnValue(
        `What type of Self Assessment tax return did you send for the tax year ${formattedTaxYear}?`
      );

      const result = presenters.taxYearToTitle(
        question,
        translate,
        englishLanguage
      );

      expect(translate).toHaveBeenCalledWith(
        "fields.sa-income-from-pensions.title",
        data
      );

      expect(result).toBe(
        `What type of Self Assessment tax return did you send for the tax year ${formattedTaxYear}?`
      );
    });

    it("should return welsh language translated content with the formatted tax year", () => {
      translate.mockReturnValue(
        `Pa fath o ffurflen dreth Hunanasesiad a anfonwyd gennych ar gyfer blwyddyn dreth ${formattedTaxYear}?`
      );

      const result = presenters.taxYearToTitle(
        question,
        translate,
        welshLanguage
      );

      expect(translate).toHaveBeenCalledWith(
        "fields.sa-income-from-pensions.title",
        data
      );

      expect(result).toBe(
        `Pa fath o ffurflen dreth Hunanasesiad a anfonwyd gennych ar gyfer blwyddyn dreth ${formattedTaxYear}?`
      );
    });
  });
});
