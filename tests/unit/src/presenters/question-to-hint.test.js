const presenters = require("../../../../src/presenters");

describe("question-to-hint", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToHint(question, translate);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.hint"
    );
  });

  describe("with found key", () => {
    it("should return translated hint when found", () => {
      translate.mockReturnValue("translated question hint");

      const result = presenters.questionToHint(question, translate);

      expect(result).toBe("translated question hint");
    });
  });
});
