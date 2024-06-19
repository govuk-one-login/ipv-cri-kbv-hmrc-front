const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/start");
const { FETCHQUESTIONS } = require("../../../../../../src/lib/config").API
  .PATHS;

jest.mock();
describe("question controller", () => {
  let controller;

  beforeEach(() => {
    controller = new Controller({ route: "/test" });
  });

  it("should be an instance of BaseController", () => {
    controller = new Controller({ route: "/test" });

    expect(controller).toBeInstanceOf(BaseController);
  });

  describe("#saveValues", () => {
    const next = jest.fn();
    const res = jest.fn();
    let req;

    beforeEach(() => {
      req = global.req;
    });

    it("should call fetchquestions endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.axios.post).toHaveBeenCalledWith(
        FETCHQUESTIONS,
        {},
        {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        }
      );
    });

    describe("when the user has sufficient questions and the endpoint returns a 2xx success response", () => {
      it("should call next", async () => {
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("when the user has insufficient questions and the endpoint returns a 4xx error response", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
