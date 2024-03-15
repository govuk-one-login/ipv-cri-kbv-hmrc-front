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

  async saveValues(req, res, next) {
    await super.saveValues(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      const choice = req.body["prove-identity-another-way"];
      const history = req.journeyModel.get("history");

      if (choice === "stop") {
        return res.redirect("/oauth2/callback?error=access_denied");
      }

      let redirect = "/kbv/answer-security-questions";
      if (history && history.length > 0) {
        const last = history[history.length - 1];
        redirect = last.next;
      }

      return res.redirect(redirect);
    });
  }
}

module.exports = ProveIdentityAnotherWayController;
