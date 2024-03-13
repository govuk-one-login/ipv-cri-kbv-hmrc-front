const presenters = require("../../../../src/presenters");

Date.now = jest.fn(() => new Date("2024-05-01"));

describe("question-to-inset", () => {
  let translate;
  let question;
  let data;
  const englishLanguage = "en";
  const welshLanguage = "cy";
  const welshDate = "1 Chwefror 2024";
  const englishDate = "1 February 2024";

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
      info: {
        months: "3",
      },
    };
    data = { dynamicDate: englishDate };

    translate = jest.fn();
  });

  it("should call translate using questionID without month when month is undefined", () => {
    question.info.months = undefined;
    presenters.questionToInset(question, translate, englishLanguage);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      {}
    );
  });

  it("should return empty string when translation not present", () => {
    translate.mockReturnValue(undefined);
    const insetTest = presenters.questionToInset(
      question,
      translate,
      englishLanguage
    );

    expect(insetTest).toBe(" ");
  });

  describe("with tranlation key found", () => {
    it("should return english language translated content", () => {
      translate.mockReturnValue(
        `translated question inset three months ago ${englishDate}`
      );

      const result = presenters.questionToInset(
        question,
        translate,
        englishLanguage
      );

      expect(translate).toHaveBeenCalledWith(
        "fields.rti-payslip-national-insurance.inset",
        data
      );

      expect(result).toBe(
        `translated question inset three months ago ${englishDate}`
      );
    });

    it("should return welsh language translated content", () => {
      translate.mockReturnValue(
        `mewnosod cwestiwn wedi'i gyfieithu dri mis yn ôl ${welshDate}`
      );

      const result = presenters.questionToInset(
        question,
        translate,
        welshLanguage
      );

      data.dynamicDate = welshDate;

      expect(translate).toHaveBeenCalledWith(
        "fields.rti-payslip-national-insurance.inset",
        data
      );

      expect(result).toBe(
        `mewnosod cwestiwn wedi'i gyfieithu dri mis yn ôl ${welshDate}`
      );
    });
  });
});
