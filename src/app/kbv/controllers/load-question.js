const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;
const {
  API: {
    PATHS: { QUESTION },
  },
} = require("../../../lib/config");
const questionKeys = require("../../../constants/question-keys");
const routes = require("../../../constants/routes");

const questionKeyToPathMap = new Map([
  [
    questionKeys.RTI_PAYSLIP_NATIONAL_INSURANCE,
    routes.ENTER_NATIONAL_INSURANCE_PAYSLIP,
  ],
  [questionKeys.RTI_PAYSLIP_INCOME_TAX, routes.ENTER_TAX_PAYSLIP],
  [
    questionKeys.ITA_BANKACCOUNT,
    routes.ENTER_4_DIGITS_BANK_ACCOUNT_TAX_CREDITS,
  ],
  [questionKeys.RTI_P60_PAYMENT_FOR_YEAR, routes.ENTER_TOTAL_FOR_YEAR_P60],
  [questionKeys.RTI_P60_EARNINGS_ABOVE_PT, routes.ENTER_EARNINGS_ABOVE_PT_P60],
  [
    questionKeys.RTI_P60_POSTGRADUATE_LOAN_DEDUCTIONS,
    routes.ENTER_POSTGRADUATE_LOAN_DEDUCTIONS_P60,
  ],
  [
    questionKeys.RTI_P60_STATUTORY_SHARED_PARENTAL_PAY,
    routes.ENTER_STATUTORY_SHARED_PARENTAL_PAY_P60,
  ],
  [
    questionKeys.RTI_P60_STATUTORY_ADOPTION_PAY,
    routes.ENTER_STATUTORY_ADOPTION_PAY_P60,
  ],
  [
    questionKeys.RTI_P60_STATUTORY_MATERNITY_PAY,
    routes.ENTER_STATUTORY_MATERNITY_PAY_P60,
  ],
  [
    questionKeys.RTI_P60_STUDENT_LOAN_DEDUCTIONS,
    routes.ENTER_STUDENT_LOAN_DEDUCTIONS_P60,
  ],
  [
    questionKeys.RTI_P60_EMPLOYEE_NI_CONTRIBUTIONS,
    routes.ENTER_EMPLOYEES_CONTRIBUTIONS_P60,
  ],
  [questionKeys.SA_INCOME_FROM_PENSIONS, routes.WHAT_TYPE_SELF_ASSESSMENT],
  [questionKeys.TC_AMOUNT, routes.ENTER_RECENT_TAX_CREDITS_PAYMENT],
  [
    questionKeys.SA_PAYMENT_DETAILS,
    routes.ENTER_RECENT_SELF_ASSESSMENT_PAYMENT,
  ],
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
