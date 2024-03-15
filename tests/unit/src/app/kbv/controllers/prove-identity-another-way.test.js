const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/prove-identity-another-way");
const presenters = require("../../../../../../src/presenters");
jest.mock("../../../../../../src/presenters");

describe("prove identity another way controller", () => {
  let controller;
  let req;
  let next;
  let res;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
    next = jest.fn();
    req = global.req;
    req.lang = "en";
    res = jest.fn();
  });

  it("should be an instance of BaseController", () => {
    controller = new Controller({ route: "/test" });

    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#locals", () => {
    beforeEach(() => {
      req.translate = jest.fn();
    });

    it("should call super.locals with req and res", () => {
      const superLocals = jest.spyOn(BaseController.prototype, "locals");

      controller.locals(req, res, next);

      expect(superLocals).toHaveBeenCalledWith(req, res, expect.any(Function));
    });

    it("should set abandonRadio locals", (done) => {
      presenters.abandonRadio.mockReturnValue({
        name: "prove-identity-another-way",
      });

      const callback = jest.fn((err, locals) => {
        expect(err).toBeNull();
        expect(locals.abandonRadio.name).toBe("prove-identity-another-way");
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
      req.journeyModel.get = jest.fn();
      res.redirect = jest.fn();
    });

    it("should call super.saveValues with req, res, and a callback", async () => {
      const superSaveValues = jest.spyOn(
        BaseController.prototype,
        "saveValues"
      );

      await controller.saveValues(req, res, next);

      expect(superSaveValues).toHaveBeenCalledWith(
        req,
        res,
        expect.any(Function)
      );
    });

    it("should redirect to /oauth2/callback?error=access_denied if choice is 'stop'", async () => {
      req.body = { "prove-identity-another-way": "stop" };

      await controller.saveValues(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(
        "/oauth2/callback?error=access_denied"
      );
    });

    it("should redirect to /kbv/answer-security-questions if history is empty", async () => {
      req.body = { "prove-identity-another-way": "continue" };
      req.journeyModel.get.mockReturnValue([]);

      await controller.saveValues(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith(
        "/kbv/answer-security-questions"
      );
    });

    it("should redirect to the next step in history if history is not empty", async () => {
      req.body = { "prove-identity-another-way": "continue" };
      req.journeyModel.get.mockReturnValue([
        { next: "/kbv/step1" },
        { next: "/kbv/step2" },
      ]);

      await controller.saveValues(req, res, next);

      expect(res.redirect).toHaveBeenCalledWith("/kbv/step2");
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
