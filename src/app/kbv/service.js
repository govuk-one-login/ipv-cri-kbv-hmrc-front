const {
  API: {
    PATHS: { QUESTION, ANSWER },
  },
} = require("../../lib/config");

const submitAnswer = async (req, questionKey, userInput) => {
  return req.axios.post(
    ANSWER,
    {
      questionKey,
      value: userInput,
    },
    {
      headers: {
        "session-id": req.session.tokenId,
        session_id: req.session.tokenId,
      },
    }
  );
};

const getNextQuestion = async (req) => {
  return req.axios.get(QUESTION, {
    headers: {
      "session-id": req.session.tokenId,
      session_id: req.session.tokenId,
    },
  });
};

module.exports = {
  submitAnswer,
  getNextQuestion,
};
