const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;
const { submitAnswer, getNextQuestion } = require("../service");
const taxYearToRange = require("../../../utils/tax-year-to-range");

class SelfAssessmentQuestionController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.info = taxYearToRange(req.session.question.info.currentTaxYear);

      callback(null, locals);
    });
  }

  async saveValues(req, res, callback) {
    await super.saveValues(req, res, async (err) => {
      if (err) {
        return callback(err);
      }

      try {
        const userInput = JSON.stringify({
          statePension: req.body.statePension || req.body.statePensionShort,
          otherPension: req.body.otherPension || req.body.otherPensionShort,
          employmentAndSupportAllowance:
            req.body.employmentAndSupportAllowance ||
            req.body.employmentAndSupportAllowanceShort,
          jobSeekersAllowance:
            req.body.jobSeekersAllowance || req.body.jobSeekersAllowanceShort,
          statePensionAndBenefits:
            req.body.statePensionAndBenefits ||
            req.body.statePensionAndBenefitsShort,
        });

        await submitAnswer(req, "sa-income-from-pensions", userInput);

        req.session.question = undefined;
        const nextQuestion = await getNextQuestion(req);

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
}

module.exports = SelfAssessmentQuestionController;