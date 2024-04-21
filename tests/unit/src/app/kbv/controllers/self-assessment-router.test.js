const BaseController = require("hmpo-form-wizard").Controller;
const SelfAssessmentRouterController = require("../../../../../../src/app/kbv/controllers/self-assessment-router");
const presenters = require("../../../../../../src/presenters");

jest.mock("../../../../../../src/presenters");
describe("SelfAssessmentRouterController", () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new SelfAssessmentRouterController({ route: "/test" });
    req = global.req;
    req.lang = "en";
    req.form.options = {
      fields: {},
      templatePath: "template-path",
    };
    req.session.question = {
      questionKey: "Q1",
      hint: "l",
      text: "t",
    };
    res = jest.fn();
  });

  it("should be an instance of BaseController", () => {
    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#locals", () => {
    beforeEach(() => {
      req.session.question = {};
      req.translate = jest.fn();
    });

    it("should set up question object correctly", (done) => {
      const fakeItems = ["item1", "item2", "item3"];
      const fakeContent = "fake content";
      const fakeTaxYearText = "2023 to 2024";

      presenters.selfAssessmentsQuestion.mockReturnValue({
        id: "questionSelfAssessmentRouter",
        name: "questionSelfAssessmentRouter",
        content: fakeContent,
        title: "fake title 2023 to 2024?",
        items: fakeItems,
      });

      const callback = jest.fn((err, locals) => {
        expect(err).toBeNull();
        expect(locals).toBeDefined();
        expect(locals.question).toBeDefined();
        expect(locals.question.id).toBe("questionSelfAssessmentRouter");
        expect(locals.question.name).toBe("questionSelfAssessmentRouter");
        expect(locals.question.content).toEqual(fakeContent);
        expect(locals.question.title).toBe(`fake title ${fakeTaxYearText}?`);
        expect(locals.question.items).toEqual(fakeItems);
        expect(presenters.selfAssessmentsQuestion).toHaveBeenCalledWith(
          "questionSelfAssessmentRouter",
          req.session.question,
          req.translate
        );
        done();
      });

      controller.locals(req, res, callback);
    });

    it("should call callback with error if super.locals returns an error", (done) => {
      const mockError = new Error("Some error");

      const callback = jest.fn((err, locals) => {
        expect(err).toEqual(mockError);
        expect(locals).toBeUndefined();
        done();
      });

      const superLocals = jest.spyOn(BaseController.prototype, "locals");
      superLocals.mockImplementation((req, res, callback) => {
        callback(mockError);
      });

      controller.locals(req, res, callback);
    });
  });
});