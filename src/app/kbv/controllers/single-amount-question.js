const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");
const moment = require("moment");
const {
  API: {
    PATHS: { QUESTION, ANSWER },
  },
} = require("../../../lib/config");

class SingleAmountQuestionController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.question = {
        label: presenters.questionToLabel(req.session.question, req.translate),
        hint: presenters.questionToHint(req.session.question, req.translate),
      };

      locals.threeMonthsAgo = moment()
        .subtract(3, "months")
        .format("DD MMMM YYYY");

      callback(null, locals);
    });
  }

  async saveValues(req, res, callback) {
    await super.saveValues(req, res, async (err) => {
      if (err) {
        return callback(err);
      }

      try {
        await req.axios.post(
          ANSWER,
          {
            key: req.session.question.questionKey,
            value: req.body.question,
          },
          {
            headers: {
              "session-id": req.session.tokenId,
              session_id: req.session.tokenId,
            },
          }
        );

        req.session.question = undefined;

        const nextQuestion = await req.axios.get(QUESTION, {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        });

        if (nextQuestion.data) {
          req.session.question = nextQuestion.data;
        }
      } catch (e) {
        debug(e);
        return callback(e);
      }

      callback();
    });
  }

  next(req) {
    if (req.session.question) {
      return "single-amount-question";
    }

    return "done";
  }
}
module.exports = SingleAmountQuestionController;
