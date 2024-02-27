const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/single-amount-question");

const presenters = require("../../../../../../src/presenters");
jest.mock("../../../../../../src/presenters");

const {
  API: {
    PATHS: { QUESTION, ANSWER },
  },
} = require("../../../../../../src/lib/config");

describe("single-amount-question controller", () => {
  let controller;
  let req;
  let next;
  let res;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
    req = global.req;
    req.lang = "en";
    req.form.options = {
      fields: {},
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
    controller = new Controller({ route: "/test" });
    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#configure", () => {
    it("should set the template to be the shared template for this controller", () => {
      controller.configure(req, res, next);
      expect(req.form.options.template).toContain("single-amount-question");
    });
  });

  describe("#locals", () => {
    beforeEach(() => {
      req.session = {
        question: {
          info: {
            months: "3",
          },
        },
      };
      req.translate = jest.fn();
    });

    it("should call super.locals with req and res", () => {
      const superLocals = jest.spyOn(BaseController.prototype, "locals");

      controller.locals(req, res, next);

      expect(superLocals).toHaveBeenCalledWith(req, res, expect.any(Function));
    });

    it("should set question.label and question.hint in locals", (done) => {
      presenters.questionToLabel.mockReturnValue("Question Label");
      presenters.questionToHint.mockReturnValue("Question Hint");
      presenters.questionToInset.mockReturnValue("Question Inset");
      presenters.questionToContent.mockReturnValue("Question Content");
      presenters.questionToTitle.mockReturnValue("Question Title");

      const callback = jest.fn((err, locals) => {
        expect(err).toBeNull();
        expect(locals.question.label).toBe("Question Label");
        expect(locals.question.hint).toBe("Question Hint");
        expect(locals.question.content).toBe("Question Content");
        expect(locals.question.inset).toBe("Question Inset");
        expect(locals.question.title).toBe("Question Title");
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
    });

    describe("on API success", () => {
      it("should call answer endpoint to post submitted answer", async () => {
        req.session.question.questionKey = "rti-payslip-national-insurance";
        req.body.question = "3";
        req.axios.get = jest.fn().mockResolvedValue({});
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(req.axios.post).toHaveBeenCalledWith(
          ANSWER,
          {
            key: "rti-payslip-national-insurance",
            value: "3",
          },
          {
            headers: {
              "session-id": req.session.tokenId,
              session_id: req.session.tokenId,
            },
          }
        );
        expect(req.axios.post).toHaveBeenCalledTimes(1);
      });

      it("should call question endpoint to get next question and store it in session", async () => {
        req.session.question.questionKey = "rti-payslip-national-insurance";
        req.body.question = "3";
        req.axios.get = jest.fn().mockResolvedValue({
          data: { questionKey: "rti-p60-payment-for-year" },
        });
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(req.axios.get).toHaveBeenCalledWith(QUESTION, {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        });
        expect(req.axios.get).toHaveBeenCalledTimes(1);
        expect(req.session.question).toEqual({
          questionKey: "rti-p60-payment-for-year",
        });
      });
    });

    describe("When answer API fails", () => {
      it("should call next with error when Post answer fails", async () => {
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });

      it("should call next with error when Get question fails", async () => {
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockResolvedValue({});
        req.axios.get = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });

      it("should call callback with error if super.locals returns an error", async () => {
        const mockError = new Error("Some error");

        const callback = jest.fn((err) => {
          expect(err).toEqual(mockError);
        });

        const superLocals = jest.spyOn(BaseController.prototype, "saveValues");
        superLocals.mockImplementation((req, res, callback) => {
          callback(mockError);
        });

        await controller.saveValues(req, res, callback);
      });
    });
  });
});
