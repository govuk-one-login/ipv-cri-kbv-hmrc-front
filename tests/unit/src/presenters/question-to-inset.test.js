const presenters = require("../../../../src/presenters");
const moment = require("moment");

describe("question-to-inset", () => {
  let translate;
  let question;
  let data;
  const language = "en";

  beforeEach(() => {
    question = {
      questionKey: "rti-payslip-national-insurance",
      info: {
        months: 3,
      },
    };
    data = {
      dynamicDate: moment()
        .subtract(question.info.months, "months")
        .locale(language)
        .format("DD MMMM YYYY"),
    };

    translate = jest.fn();
  });

  it("should call translate using questionID and months", () => {
    presenters.questionToInset(question, translate, language);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      data
    );
  });

  it("should call translate using questionID and 12 months", () => {
    question.info.months = 12;
    data = {
      dynamicDate: moment()
        .subtract(question.info.months, "months")
        .locale(language)
        .format("DD MMMM YYYY"),
    };

    presenters.questionToInset(question, translate, language);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      data
    );
  });

  it("should call translate using questionID without month when month is 0", () => {
    question.info.months = 0;
    presenters.questionToInset(question, translate, language);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      {}
    );
  });

  it("should call translate using questionID", () => {
    question.info.months = undefined;
    presenters.questionToInset(question, translate, language);

    expect(translate).toHaveBeenCalledWith(
      "fields.rti-payslip-national-insurance.inset",
      {}
    );
  });

  describe("with found key", () => {
    it("should return translated inset when found", () => {
      translate.mockReturnValue(
        `translated question inset three months ago ${data.dynamicDate}`
      );

      const result = presenters.questionToInset(question, translate, language);

      expect(result).toBe(
        `translated question inset three months ago ${data.dynamicDate}`
      );
    });
  });
});
