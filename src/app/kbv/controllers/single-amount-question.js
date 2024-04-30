const debug = require("debug")("load-question");
const path = require("path");
const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");
const fields = require("../fieldsHelper");
const { submitAnswer, getNextQuestion } = require("../service");

class SingleAmountQuestionController extends BaseController {
  configure(req, res, next) {
    req.form.options.template = path.join(
      req.form.options.templatePath,
      "single-amount-question"
    );
    super.configure(req, res, next);
  }

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.question = {
        label: presenters.questionToLabel(req.session.question, req.translate),
        hint: presenters.questionToHint(req.session.question, req.translate),
        content: presenters.questionToContent(
          req.session.question,
          req.translate,
          req.lang
        ),
        inset: presenters.questionToInset(
          req.session.question,
          req.translate,
          req.lang
        ),
        details: presenters.questionToDetails(
          req.session.question,
          req.translate,
          req.lang
        ),
        title: presenters.questionToTitle(req.session.question, req.translate),
        prefix: "£",
        name: req.session.question?.questionKey,
      };

      callback(null, locals);
    });
  }

  async saveValues(req, res, callback) {
    await super.saveValues(req, res, async (err) => {
      if (err) {
        return callback(err);
      }

      let userInput = req.body[req.session.question.questionKey];
      userInput = userInput && fields.stripSpaces(userInput);

      if (req.session.question.questionKey === "rti-p60-earnings-above-pt") {
        userInput = fields.stripDecimal(userInput);
      }

      try {
        await submitAnswer(req, req.session.question.questionKey, userInput);

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
module.exports = SingleAmountQuestionController;
