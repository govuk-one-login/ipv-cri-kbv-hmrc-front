const BaseController = require("hmpo-form-wizard").Controller;

class QuestionController extends BaseController {
  locals(req, res, callback) {
    super.locals(req, res, (err, locals) => {
      if (err) {
        return callback(err, locals);
      }

      locals.question = {
        key: req.session.question.questionKey,
        label: "question label",
        hint: "question hint",
      };

      callback(null, locals);
    });
  }

  next(req) {
    if (req.session.question) {
      return "question";
    }

    return "done";
  }
}
module.exports = QuestionController;
