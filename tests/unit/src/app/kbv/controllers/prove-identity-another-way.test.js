const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/prove-identity-another-way");

const {
  API: {
    PATHS: { ABANDON },
  },
} = require("../../../../../../src/lib/config");

describe("prove identity another way test", () => {
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
      req.form.values.abandonRadio = "continue";
    });

    describe("When radio button value is stop", () => {
      it("should call abandon endpoint", async () => {
        req.form.values.abandonRadio = "stop";
        await controller.saveValues(req, res, next);

        expect(req.axios.post).toHaveBeenCalledWith(ABANDON, undefined, {
          headers: {
            "session-id": req.session.tokenId,
            session_id: "session-id",
          },
        });
      });
    });

    describe("When radio button value is continue", () => {
      it("should not call abandon endpoint", async () => {
        await controller.saveValues(req, res, next);

        expect(req.axios.post).not.toHaveBeenCalled();
      });
    });

    describe("on API success", () => {
      it("should call next", async () => {
        req.axios.post = jest.fn().mockResolvedValue({});

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("on API failure", () => {
      it("should call next with error", async () => {
        req.form.values.abandonRadio = "stop";
        const error = new Error("Async error message");
        req.axios.post = jest.fn().mockRejectedValue(error);

        await controller.saveValues(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
