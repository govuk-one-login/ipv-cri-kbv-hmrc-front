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
  [
    "rti-p60-postgraduate-loan-deductions",
    "enter-postgraduate-loan-deductions-p60",
  ],
  [
    "rti-p60-statutory-shared-parental-pay",
    "enter-statutory-shared-parental-pay-p60",
  ],
  ["rti-p60-statutory-adoption-pay", "enter-statutory-adoption-pay-p60"],
  ["rti-p60-statutory-maternity-pay", "enter-statutory-maternity-pay-p60"],
  ["rti-p60-student-loan-deductions", "enter-student-loan-deductions-p60"],
  ["rti-p60-employee-ni-contributions", "enter-employees-contributions-p60"],
  ["sa-income-from-pensions", "what-type-self-assessment"],
  ["tc-amount", "enter-recent-tax-credits-payment"],
  ["sa-payment-details", "enter-recent-self-assessment-payment"],
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
