const BaseController = require("hmpo-form-wizard").Controller;
const taxYearToRange = require("../../../utils/tax-year-to-range");

class SelfAssessmentRouterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      const { yearRangeStart, yearRangeEnd } = taxYearToRange(
        req.session.question?.info?.currentTaxYear
      );
      locals.yearRangeStart = yearRangeStart;
      locals.yearRangeEnd = yearRangeEnd;

      callback(null, locals);
    });
  }
}

module.exports = SelfAssessmentRouterController;
