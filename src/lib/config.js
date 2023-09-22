require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8080",
    PATHS: {
      SESSION: "session",
      AUTHORIZATION: "authorization",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:5000",
    PATHS: {
      KBV: "/kbv",
    },
    ANALYTICS: {
      ID: process.env.ANALYTICS_UA_ID,
      GA4_ID: process.env.ANALYTICS_GA4_ID,
      DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
    },
  },
  AWS_REGION: process.env.AWS_REGION || "eu-west-2",
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
};
