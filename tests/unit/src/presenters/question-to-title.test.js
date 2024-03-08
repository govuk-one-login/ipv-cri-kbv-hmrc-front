const presenters = require("../../../../src/presenters");

describe("question-to-title", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToTitle(question, translate);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.title"
    );
  });

  describe("with found key", () => {
    it("should return translated title when found", () => {
      translate.mockReturnValue("translated question title");

      const result = presenters.questionToTitle(question, translate);

      expect(result).toBe("translated question title");
    });
  });
});
