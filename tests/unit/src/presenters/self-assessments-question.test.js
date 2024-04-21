const selfAssessmentsQuestion = require("../../../../src/presenters/self-assessments-question");
const taxYearToText = require("../../../../src/presenters/tax-year-to-text");

describe("selfAssessmentsQuestion", () => {
  it("should return the correct object", () => {
    const translationKey = "exampleKey";
    const question = "exampleQuestion";
    const translate = jest.fn();

    translate.mockReturnValueOnce({
      item1: "Item 1",
      item2: "Item 2",
    });
    translate.mockReturnValueOnce("Example content");
    translate.mockReturnValueOnce("Example title");

    const expectedObject = {
      id: translationKey,
      name: translationKey,
      content: "Example content",
      title: "Example title",
      items: ["Item 1", "Item 2"],
    };

    const result = selfAssessmentsQuestion(translationKey, question, translate);

    expect(result).toEqual(expectedObject);
    expect(translate).toHaveBeenCalledWith(`fields.${translationKey}.items`);
    expect(translate).toHaveBeenCalledWith(`fields.${translationKey}.content`);
    expect(translate).toHaveBeenCalledWith(
      `fields.${translationKey}.title`,
      taxYearToText(question)
    );
  });
});
