const debug = require("debug")("load-question");
const BaseController = require("hmpo-form-wizard").Controller;
const constants = require("../../../constants/question-keys");
const { submitAnswer, getNextQuestion } = require("../service");

class SelfAssessmentPaymentQuestionController extends BaseController {
  async saveValues(req, res, callback) {
    await super.saveValues(req, res, async (err) => {
      if (err) {
        return callback(err);
      }

      try {
        const userInput = JSON.stringify({
          selfAssessmentPaymentDate: req.body.selfAssessmentPaymentDate,
          selfAssessmentPaymentAmount: req.body.selfAssessmentPaymentAmount,
        });

        await submitAnswer(req, constants.SA_PAYMENT_DETAILS, userInput);

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

module.exports = SelfAssessmentPaymentQuestionController;
