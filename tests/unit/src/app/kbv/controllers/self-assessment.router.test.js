const BaseController = require("hmpo-form-wizard").Controller;
const SelfAssessmentRouterController = require("../../../../../../src/app/kbv/controllers/self-assessment-router");

jest.mock("../../../../../../src/utils/tax-year-to-range");

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
      info: {
        currentTaxYear: "2023/2024",
      },
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
    it("should set up locals object correctly", (done) => {
      const taxYearToRange = require("../../../../../../src/utils/tax-year-to-range");
      taxYearToRange.mockReturnValue({
        yearRangeStart: 2023,
        yearRangeEnd: 2024,
      });
      req.translate = jest.fn().mockReturnValue("translated content");

      const callback = jest.fn((err, locals) => {
        expect(err).toBeNull();
        expect(locals).toBeDefined();
        expect(locals.yearRangeStart).toBe(2023);
        expect(locals.yearRangeEnd).toBe(2024);
        expect(locals.content).toBe("translated content");
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
