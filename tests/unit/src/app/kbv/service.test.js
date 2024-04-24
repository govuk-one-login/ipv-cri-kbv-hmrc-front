const service = require("../../../../../src/app/kbv/service");
const {
  API: {
    PATHS: { QUESTION, ANSWER },
  },
} = require("../../../../../src/lib/config");

describe("Service Tests", () => {
  describe("submitAnswer", () => {
    it("should make a POST request to the ANSWER endpoint with the correct data and headers", async () => {
      const req = {
        axios: {
          post: jest.fn(),
        },
        session: {
          tokenId: "testTokenId",
        },
      };
      const questionKey = "testQuestionKey";
      const userInput = "testUserInput";

      await service.submitAnswer(req, questionKey, userInput);

      expect(req.axios.post).toHaveBeenCalledWith(
        ANSWER,
        {
          key: questionKey,
          value: userInput,
        },
        {
          headers: {
            "session-id": req.session.tokenId,
            session_id: req.session.tokenId,
          },
        }
      );
    });
  });

  describe("getNextQuestion", () => {
    it("should make a GET request to the QUESTION endpoint with the correct headers", async () => {
      const req = {
        axios: {
          get: jest.fn(),
        },
        session: {
          tokenId: "testTokenId",
        },
      };

      await service.getNextQuestion(req);

      expect(req.axios.get).toHaveBeenCalledWith(QUESTION, {
        headers: {
          "session-id": req.session.tokenId,
          session_id: req.session.tokenId,
        },
      });
    });
  });
});
