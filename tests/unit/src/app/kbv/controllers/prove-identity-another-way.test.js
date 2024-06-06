const BaseController = require("hmpo-form-wizard").Controller;
const Controller = require("../../../../../../src/app/kbv/controllers/prove-identity-another-way");

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
      req.form.values.abandonRadio = "continue";
    });

    describe("When radio button value is stop", () => {
      it("should call savevalues", async () => {
        req.form.values.abandonRadio = "stop";
        controller.saveValues(req, res, next);
      });
    });
  });
});
