const loadQuestionController = require("./controllers/load-question");
const singleAmountQuestionController = require("./controllers/single-amount-question");

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
  "/single-amount-question": {
    controller: singleAmountQuestionController,
    next: singleAmountQuestionController.prototype.next,
  },
  "/done": {
    skip: true,
    noPost: true,
    next: "/oauth2/callback",
  },
};
