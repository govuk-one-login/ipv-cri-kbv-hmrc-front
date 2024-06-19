const BaseController = require("hmpo-form-wizard").Controller;
const {
  API: {
    PATHS: { FETCHQUESTIONS },
  },
} = require("../../../lib/config");

class StartController extends BaseController {
  async saveValues(req, res, next) {
    // This call is to prime the questions set on the backend and ensure there are sufficient questions for this user
    // Expect 2xx response if sufficient questions, allow to continue
    // Expect non-2xx response if insufficient questions, let error bubble up to oauth callback
    try {
      await req.axios.post(
        FETCHQUESTIONS,
        {},
        {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        }
      );
      super.saveValues(req, res, () => next());
    } catch (err) {
      next(err);
    }
  }
}

module.exports = StartController;
