const BaseController = require("hmpo-form-wizard").Controller;
const taxYearToRange = require("../../../utils/tax-year-to-range");

class SelfAssessmentRouterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const translationKey = "questionWhatTypeSelfAssessment";

      const { yearRangeStart, yearRangeEnd } = taxYearToRange(
        req.session.question?.info?.currentTaxYear
      );

      locals.yearRangeStart = yearRangeStart;
      locals.yearRangeEnd = yearRangeEnd;

      locals.content = req.translate(`fields.${translationKey}.content`);

      callback(null, locals);
    });
  }
}

module.exports = SelfAssessmentRouterController;
