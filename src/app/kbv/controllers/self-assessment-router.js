const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");

class SelfAssessmentRouterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const translationKey = "questionSelfAssessmentRouter";

      locals.content = req.translate(`fields.${translationKey}.content`);
      locals.question = presenters.selfAssessmentsQuestion(
        translationKey,
        req.session.question,
        req.translate
      );

      callback(null, locals);
    });
  }
}

module.exports = SelfAssessmentRouterController;
