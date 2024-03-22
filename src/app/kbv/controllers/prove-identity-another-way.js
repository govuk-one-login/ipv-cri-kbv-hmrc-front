const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { ABANDON },
  },
} = require("../../../lib/config");

class ProveIdentityAnotherWayController extends BaseController {
  async saveValues(req, res, callback) {
    try {
      const choice = req.form.values.abandonRadio;
      if (choice === "stop") {
        await this.abandonJourney(req);
      }
      super.saveValues(req, res, async () => callback());
    } catch (err) {
      callback(err);
    }
  }

  abandonJourney(req) {
    return req.axios.post(ABANDON, undefined, {
      headers: {
        "session-id": req.session.tokenId,
        session_id: req.session.tokenId,
      },
    });
  }

  isQuestionJourneyStarted(req) {
    const history = req.journeyModel.get("history");
    const last = history[history.length - 1];

    return last.next !== "/kbv/answer-security-questions";
  }
}

module.exports = ProveIdentityAnotherWayController;
