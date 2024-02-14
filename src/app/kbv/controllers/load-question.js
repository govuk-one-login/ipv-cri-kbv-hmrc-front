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
          },
        });

        req.session.question = apiResponse.data;
      } catch (e) {
        debug(e);
        return next(e);
      }

      next();
    });
  }

  isSingleAmountQuestion(req) {
    if (
      req.session?.question?.questionKey === "rti-payslip-national-insurance"
    ) {
      return true;
    }

    return false;
  }
}
module.exports = LoadQuestionController;
