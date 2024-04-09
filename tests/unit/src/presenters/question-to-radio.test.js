const presenters = require("../../../../src/presenters");

jest.mock("../../../../src/presenters/question-to-label");
jest.mock("../../../../src/presenters/question-to-hint");

describe("question-to-radio", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "Q00",
      text: "question text",
    };

    translate = jest.fn();
  });

  it("should call translate using questionKey", () => {
    presenters.questionToRadio(question, translate);

    expect(translate).toHaveBeenCalledWith("fields.Q00.items");
  });

  describe("with found key", () => {
    it("should return object with translated items", () => {
      translate.mockReturnValue({
        option1: "translated option 1",
        option2: "translated option 2",
      });

      presenters.questionToLabel.mockReturnValue("translated label");
      presenters.questionToHint.mockReturnValue("translated hint");
      const result = presenters.questionToRadio(question, translate);

      expect(result).toEqual({
        id: "Q00",
        name: "Q00",
        label: "translated label",
        legend: "translated label",
        fieldset: {
          legend: {
            isPageHeading: true,
            classes: "govuk-fieldset__legend--l",
          },
        },
        hint: {
          html: "translated hint",
        },
        items: ["translated option 1", "translated option 2"],
      });
    });
  });
});
