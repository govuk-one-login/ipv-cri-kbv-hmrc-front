const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");

class SelfAssessmentRouterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const translationKey = "self-assessment-router";
      const items = Object.values(
        req.translate(`fields.${translationKey}.items`)
      );
      const content = req.translate(`fields.${translationKey}.content`);

      locals.question = {
        id: translationKey,
        name: translationKey,
        content: content,
        title: req.translate(
          `fields.${translationKey}.title`,
          presenters.taxYearToText(req.session.question)
        ),
        items: items,
      };

      callback(null, locals);
    });
  }
}

module.exports = SelfAssessmentRouterController;
