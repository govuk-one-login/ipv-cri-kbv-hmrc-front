const loadQuestionController = require("./controllers/load-question");
const questionController = require("./controllers/question");

module.exports = {
  "/": {
    resetJourney: true,
    entryPoint: true,
    skip: true,
    next: "load-question",
  },
  "/load-question": {
    controller: loadQuestionController,
    skip: true,
    next: loadQuestionController.prototype.next,
  },
  "/question": {
    controller: questionController,
    next: questionController.prototype.next,
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
