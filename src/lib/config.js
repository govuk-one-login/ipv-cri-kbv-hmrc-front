require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8080",
    PATHS: {
      SESSION: "session",
      AUTHORIZATION: "authorization",
      QUESTION: "question",
      ANSWER: "answer",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:5000",
    PATHS: {
      KBV: "/kbv",
    },
    ANALYTICS: {
      COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
      UA_CONTAINER_ID: process.env.UA_CONTAINER_ID,
      GA4_ENABLED: process.env.GA4_ENABLED || "false",
      GA4_CONTAINER_ID: process.env.GA4_CONTAINER_ID,
    },
  },
  AWS_REGION: process.env.AWS_REGION || "eu-west-2",
  PORT: Number(process.env.PORT) || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: Number(process.env.SESSION_TTL) || 7200000, // two hours in ms
};
