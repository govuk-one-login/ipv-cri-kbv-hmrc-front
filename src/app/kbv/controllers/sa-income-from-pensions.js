const path = require("path");
const BaseController = require("hmpo-form-wizard").Controller;
const presenters = require("../../../presenters");

class SaIncomeFromPensionsController extends BaseController {
  configure(req, res, next) {
    req.form.options.template = path.join(
      req.form.options.templatePath,
      "sa-income-from-pensions"
    );
    super.configure(req, res, next);
  }

  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.question = {
        ...presenters.questionToRadio(req.session.question, req.translate),
        content: presenters.questionToContent(
          req.session.question,
          req.translate
        ),
        title: presenters.taxYearToTitle(req.session.question, req.translate),
      };

      callback(null, locals);
    });
  }

  async saveValues(req, res, callback) {
    super.saveValues(req, res, async () => callback());
  }
}

module.exports = SaIncomeFromPensionsController;
