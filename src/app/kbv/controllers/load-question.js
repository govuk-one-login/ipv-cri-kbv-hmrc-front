const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;
const {
  API: {
    PATHS: { QUESTION },
  },
} = require("../../../lib/config");
const constants = require("../../../constants/question-keys");

const questionKeyToPathMap = new Map([
  [
    constants.RTI_PAYSLIP_NATIONAL_INSURANCE,
    "enter-national-insurance-payslip",
  ],
  [constants.RTI_PAYSLIP_INCOME_TAX, "enter-tax-payslip"],
  [constants.ITA_BANKACCOUNT, "enter-4-digits-bank-account-tax-credits"],
  [constants.RTI_P60_PAYMENT_FOR_YEAR, "enter-total-for-year-p60"],
  [constants.RTI_P60_EARNINGS_ABOVE_PT, "enter-earnings-above-pt-p60"],
  [
    constants.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS,
    "enter-postgraduate-loan-deductions-p60",
  ],
  [
    constants.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY,
    "enter-statutory-shared-parental-pay-p60",
  ],
  [
    constants.RTI_P60_STATUTORY_ADOPTION_PAY,
    "enter-statutory-adoption-pay-p60",
  ],
  [
    constants.RTI_P60_STATUTORY_MATERNITY_PAY,
    "enter-statutory-maternity-pay-p60",
  ],
  [
    constants.RTI_P60_STUDENT_LOAN_DEDUCTIONS,
    "enter-student-loan-deductions-p60",
  ],
  [
    constants.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS,
    "enter-employees-contributions-p60",
  ],
  [constants.SA_INCOME_FROM_PENSIONS, "what-type-self-assessment"],
  [constants.TC_AMOUNT, "enter-recent-tax-credits-payment"],
  [constants.SA_PAYMENT_DETAILS, "enter-recent-self-assessment-payment"],
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
