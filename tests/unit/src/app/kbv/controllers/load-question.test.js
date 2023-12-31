const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/load-question");

const {
  API: {
    PATHS: { QUESTION },
  },
} = require("../../../../../../src/lib/config");

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
    beforeEach(() => {
      req.session.tokenId = "session-id";
      req.axios.post = jest.fn();
    });
    it("should call question endpoint", async () => {
      await controller.saveValues(req, res, next);

      expect(req.axios.get).toHaveBeenCalledWith(QUESTION, {
        headers: {
          "session-id": req.session.tokenId,
        },
      });
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.get = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        let error = new Error("Async error message");
        req.axios.get = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe("#next", () => {
    it('should route to "question" with a question', () => {
      req.session.question = {};

      let route = controller.next(req);

      expect(route).toBe("question");
    });

    it('should route to "done" with a question', () => {
      let route = controller.next(req);

      expect(route).toBe("done");
    });
  });
});
