const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;

const {
  API: {
    PATHS: { QUESTION },
  },
} = require("../../../lib/config");

const questionKeyToPathMap = new Map([
  ["rti-payslip-national-insurance", "enter-national-insurance-payslip"],
  ["rti-payslip-income-tax", "enter-tax-payslip"],
  ["ita-bankaccount", "enter-4-digits-bank-account-tax-credits"],
  ["rti-p60-payment-for-year", "enter-total-for-year-p60"],
  ["rti-p60-earnings-above-pt", "enter-earnings-above-pt-p60"],
  ["sa-income-from-pensions", "what-type-self-assessment"],
]);

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

  hasQuestion(req) {
    return !!req.session?.question;
  }

  getQuestionPath(req) {
    return `question/${questionKeyToPathMap.get(
      req.session?.question?.questionKey
    )}`;
  }
}
module.exports = LoadQuestionController;
