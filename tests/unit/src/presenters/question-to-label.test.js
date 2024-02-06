const presenters = require("../../../../src/presenters");

describe("question-to-hint", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "Q00",
      text: "question text",
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToLabel(question, translate);

    expect(translate).toHaveBeenCalledWith("fields.Q00.label");
  });

  describe("with found key", () => {
    it("should return translated hint", () => {
      translate.mockReturnValue("translated question label");

      const result = presenters.questionToLabel(question, translate);

      expect(result).toBe("translated question label");
    });
  });
});
