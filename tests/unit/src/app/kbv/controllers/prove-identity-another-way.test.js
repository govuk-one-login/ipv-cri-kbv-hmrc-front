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
});
