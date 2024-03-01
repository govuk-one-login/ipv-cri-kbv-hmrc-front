const presenters = require("../../../../src/presenters");

describe("question-to-content", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToContent(question, translate);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.content"
    );
  });

  describe("with found key", () => {
    it("should return translated content when found", () => {
      translate.mockReturnValue("translated question content");

      const result = presenters.questionToContent(question, translate);

      expect(result).toBe("translated question content");
    });
  });
});
