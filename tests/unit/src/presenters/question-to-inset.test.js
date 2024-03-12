const presenters = require("../../../../src/presenters");
const moment = require("moment");

describe("question-to-inset", () => {
  let translate;
  let question;
  let locals;
  const language = "en";

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
    };
    locals = {
      dynamicDate: moment()
        .subtract(3, "months")
        .locale(language)
        .format("DD MMMM YYYY"),
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToInset(question, translate, language);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      locals
    );
  });

  describe("with found key", () => {
    it("should return translated inset when found", () => {
      translate.mockReturnValue(
        "translated question inset three months ago 5 December 2023"
      );

      const result = presenters.questionToInset(question, translate, language);

      expect(result).toBe(
        "translated question inset three months ago 5 December 2023"
      );
    });
  });
});
