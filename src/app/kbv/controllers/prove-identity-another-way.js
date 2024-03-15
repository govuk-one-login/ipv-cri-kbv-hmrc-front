const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");

class ProveIdentityAnotherWayController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.abandonRadio = presenters.abandonRadio(req.translate);
      callback(err, locals);
    });
  }
}

module.exports = ProveIdentityAnotherWayController;
