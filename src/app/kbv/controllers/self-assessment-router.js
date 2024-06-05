const BaseController = require("hmpo-form-wizard").Controller;
const taxYearToRange = require("../../../utils/tax-year-to-range");

class SelfAssessmentRouterController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals = taxYearToRange(req.session.question?.info?.currentTaxYear);

      callback(null, locals);
    });
  }
}

module.exports = SelfAssessmentRouterController;
