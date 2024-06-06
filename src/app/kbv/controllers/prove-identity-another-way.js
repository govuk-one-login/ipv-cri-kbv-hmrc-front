const BaseController = require("hmpo-form-wizard").Controller;
class ProveIdentityAnotherWayController extends BaseController {
  saveValues(req, res, callback) {
    super.saveValues(req, res, async () => callback());
  }
}

module.exports = ProveIdentityAnotherWayController;
