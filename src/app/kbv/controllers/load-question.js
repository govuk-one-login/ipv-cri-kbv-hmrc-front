const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { QUESTION },
  },
} = require("../../../lib/config");

class LoadQuestionController extends BaseController {
  async saveValues(req, res, next) {
    super.saveValues(req, res, async () => {
      try {
        const apiResponse = await req.axios.get(`${QUESTION}`, {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        });

        console.log(apiResponse.data);

        req.session.question = apiResponse.data;
      } catch (e) {
        debug(e);
        return next(e);
      }

      next();
    });
  }
  next(req) {
    debug(req.session);
    debug(req.session.authParams);
    if (req.session?.question) {
      return "question";
    }

    return "done";
  }
}
module.exports = LoadQuestionController;
