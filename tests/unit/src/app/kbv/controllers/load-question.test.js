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

      describe("with 200 response", () => {
        it("should set question", async () => {
          req.axios.get = jest
            .fn()
            .mockResolvedValue({ status: 200, data: { key: "value" } });

          await controller.saveValues(req, res, next);

          expect(req.session.question).toEqual({ key: "value" });
        });
      });

      describe("with 204 response", () => {
        it("should not set question", async () => {
          req.axios.get = jest
            .fn()
            .mockResolvedValue({ status: 204, data: { key: "value" } });

          await controller.saveValues(req, res, next);

          expect(req.session.question).toBeUndefined();
        });
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        const error = new Error("Async error message");
        req.axios.get = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });

  describe("#hasQuestion", () => {
    it("should return true with a question", () => {
      req.session.question = {};

      const hasQuestion = controller.hasQuestion(req);

      expect(hasQuestion).toBeTruthy();
    });

    it("should return false without question", () => {
      const hasQuestion = controller.hasQuestion(req);

      expect(hasQuestion).toBeFalsy();
    });
  });
});
