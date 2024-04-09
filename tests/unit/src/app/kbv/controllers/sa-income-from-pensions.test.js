const BaseController = require("hmpo-form-wizard").Controller;
const SaIncomeFromPensionsController = require("../../../../../../src/app/kbv/controllers/sa-income-from-pensions");

const presenters = require("../../../../../../src/presenters");
jest.mock("../../../../../../src/presenters");

describe("SaIncomeFromPensionsController", () => {
  let controller;
  let req;
  let next;
  let res;

  beforeEach(() => {
    controller = new SaIncomeFromPensionsController({ route: "/test" });
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
    next = jest.fn();
    res = jest.fn();
  });

  it("should be an instance of BaseController", () => {
    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#configure", () => {
    it("should set the template to be the shared template for this controller", () => {
      controller.configure(req, res, next);
      expect(req.form.options.template).toContain("sa-income-from-pensions");
    });
  });

  describe("#locals", () => {
    beforeEach(() => {
      req.session.question = {};
      req.translate = jest.fn();
    });

    it("should call super.locals with req and res", () => {
      const superLocals = jest.spyOn(BaseController.prototype, "locals");
      controller.locals(req, res, next);
      expect(superLocals).toHaveBeenCalledWith(req, res, expect.any(Function));
    });

    it("should set question properties in locals", (done) => {
      presenters.questionToRadio.mockReturnValueOnce({
        id: "questionId",
        name: "questionName",
        label: "Question Label",
        legend: "Question Label",
        fieldset: {
          legend: {
            isPageHeading: true,
            classes: "govuk-fieldset__legend--l",
          },
        },
        hint: {
          html: "Question Hint",
        },
        items: ["Option1", "Option2"],
      });

      const callback = jest.fn((err, locals) => {
        expect(err).toBeNull();
        expect(locals.question).toEqual({
          id: "questionId",
          name: "questionName",
          label: "Question Label",
          legend: "Question Label",
          fieldset: {
            legend: {
              isPageHeading: true,
              classes: "govuk-fieldset__legend--l",
            },
          },
          hint: {
            html: "Question Hint",
          },
          items: ["Option1", "Option2"],
        });
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

  describe("#saveValues", () => {
    beforeEach(() => {
      req.session.tokenId = "session-id";
      req.axios.post = jest.fn();
      req.axios.get = jest.fn();
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });
  });
});
