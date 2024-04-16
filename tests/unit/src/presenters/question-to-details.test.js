const presenters = require("../../../../src/presenters");

describe("question-to-details", () => {
  let translate;
  let question;

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
    };

    translate = jest.fn();
  });

  it("should call translate using questionID", () => {
    presenters.questionToDetails(question, translate);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.details"
    );
  });

  describe("with found key", () => {
    it("should return details when found with expected structure", () => {
      const mockDetails = {
        summaryText: "Test summary text",
        html: "<p>Test HTML content</p>",
      };

      translate.mockReturnValue(mockDetails);

      const result = presenters.questionToDetails(question, translate);

      expect(result).toEqual(mockDetails);
    });
  });

  describe("with missing or invalid key", () => {
    it("should return an empty string if details are missing", () => {
      translate.mockReturnValue(undefined);

      const result = presenters.questionToDetails(question, translate);

      expect(result).toBe(" ");
    });

    it("should return an empty string if details are not in the expected format", () => {
      translate.mockReturnValue({
        summaryText: "Test summary text",
        description: "Invalid property",
      });

      const result = presenters.questionToDetails(question, translate);

      expect(result).toBe(" ");
    });
  });
});
